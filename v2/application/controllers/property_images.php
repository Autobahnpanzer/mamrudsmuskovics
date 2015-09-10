<?php
class Property_images extends MY_Controller {

  function __construct() {
    parent::__construct();
  }

  public function index() {
    show_404();
  }

  public function show($route) {

    if(ENVIRONMENT == 'production')
      $this->output->cache(60);

    $data = array();

    $data = $this->properties_model->get_entry_by_route($route); // TODO: sanitize XSS

    if(!$data['property'] || !$data['images'])
      show_404();

    $this->page['body_class'] = 'album-layout';
    $this->page['page_title'] = "Fotos ". $data['property']['title'] . " - DVI Gruppe";
    $this->page['meta'] = $this->load->view('shared/_meta_noindex', array(), true);
    $this->page['header'] = '';
    $this->page['footer'] = '';

    $content = $this->load->view('property_images/_index', $data, TRUE, TRUE);
    $this->render($content);

  }

  public function import_images() {

    if($this->config->item('migration_enabled') == TRUE)
      die('Enable migrations to import images.');

    $this->load->helper(array('file', 'form'));

    $data = array();
    $data['properties'] = $this->properties_model->get_entries();

    $this->load->view('property_images/import', $data);

  }

  public function upload() {

    //TODO: refactor, add support for JPEG

    if($this->config->item('migration_enabled') == TRUE)
      die('Enable migrations to import images.');

    $this->load->spark('unzip/1.0.0');
    $this->load->library('unzip');
    $this->load->helper(array('file', 'form'));
    $this->load->library('upload', array(
            'upload_path' => $this->uploads_dir,
            'max_size' => $this->upload_max_filesize,
            'allowed_types' => 'zip'));

    $data = array();
    $data['properties'] = $this->properties_model->get_entries();

    if (!$this->upload->do_upload()) {

      log_message('error', 'Import: Error handling upload');

      $data['status'] = $this->upload->display_errors();

    } else {

      log_message('debug', 'Import: Upload ok');

      $date = new DateTime();
      $now = $date->getTimestamp();

      $upload_data = $this->upload->data();
      mkdir($upload_data['file_path'] . $now, 0777);

      // unzip
      $this->unzip->extract($upload_data['full_path'], $upload_data['file_path'] . $now);

      log_message('debug', 'Import: Unzip');

      if($this->input->post('replace_old_files') == true)
        $this->_cleanup($this->input->post('object_id'));

      // copy, rename and insert in db
      $files = get_filenames($upload_data['file_path'] . $now, TRUE);
      $i = 1;
      foreach($files as $file) {
        $new_file = $now . '_' . $i . '.jpg';
        copy($file, $this->db_files_dir . $new_file);
        // insert in db
        $this->property_images_model->save($this->input->post('object_id'), $new_file);
        $i++;
      }

      log_message('debug', 'Import: Copy, rename and insert in DB happened');

      // clean up
      delete_files($upload_data['file_path'] . $now);
      @rmdir($upload_data['file_path'] . $now);
      unlink($upload_data['full_path']);

      log_message('debug', 'Import: Cleaned up');

      $data['status'] = 'Done.';
    }

    $this->load->view('property_images/import', $data);

  }

  private function _cleanup($object_id) {

    // remove old stuff
    $files = $this->property_images_model->get_entries_by_property_id_ordered($object_id);
    foreach($files as $file) {
      // file exists?
      @unlink($this->db_files_dir . $file['file_name']);
    }
    $files = $this->property_images_model->delete_by_property_id($object_id);

    log_message('debug', 'Import: Old stuff removed');

    return true;

  }

}

?>
