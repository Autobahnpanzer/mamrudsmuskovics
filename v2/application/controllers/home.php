<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home extends MY_Controller {

  function __construct() {
    parent::__construct();
  }

  // --------------------------------------------------------------------

  public function index() {

    $data = array();

    $properties = $this->properties_model->get_entries_with_image();
    $data['properties'] = $properties;

    $data['view_type'] = $this->_getViewType();

    if($data['view_type'] == 'map')
      $data['map'] = $this->_buildPropertiesMap($properties, '574px', '500px');

    $this->page['page_title'] = 'DVI Gruppe';
    $content = $this->load->view('home/_index', $data, TRUE, TRUE);

    $this->render($content);

  }

  public function profiles() {
    $this->page['page_title'] = 'Ankaufsprofile - DVI Gruppe';
    $this->render();
  }

  public function funds() {
    if(ENVIRONMENT == 'production')
      $this->output->cache(240);
    $this->page['page_title'] = 'Fonds - DVI Gruppe';
    $this->render();
  }


  public function about() {
    if(ENVIRONMENT == 'production')
      $this->output->cache(240);
    $this->page['page_title'] = 'Über uns - DVI Gruppe';
    $this->render();
  }

  public function imprint() {
    if(ENVIRONMENT == 'production')
      $this->output->cache(240);
    $this->page['page_title'] = 'Impressum - DVI Gruppe';
    $this->render();
  }

}

?>
