<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class properties extends MY_Controller {

  function __construct() {
    parent::__construct();
  }

  public function index($type = FALSE) {

    switch ($type) {
        case 'wohnen':
        $property_type = 'residential';
        $page_title = 'Wohnimmobilien';
      break;
        case 'gewerbe':
        $property_type = 'commercial';
        $page_title = 'Gewerbeimmobilien';
      break;
        case 'entwicklung':
        $property_type = 'development';
        $page_title = 'Entwicklung';
      break;
      case FALSE:
        $property_type = FALSE;
        $page_title = 'Immobilien';
      break;
    }

    $data = array();

    if($property_type == FALSE)
      $data['properties'] = $this->properties_model->get_entries_with_image();
    else
      $data['properties'] = $this->properties_model->get_entries_with_image('is_' . $property_type);

    $data['view_type'] = $this->_getViewType();

    // ajax request?
    if($this->input->is_ajax_request()) {

      if($property_type == FALSE)
        $this->load->view('home/_index', $data);
      else
        $this->load->view('properties/_' . $property_type, $data);

    } else {

      if($data['view_type'] == 'map')
        $data['map'] = $this->_buildPropertiesMap($data['properties'], '574px', '500px');

      $this->page['page_title'] = $page_title . ' - DVI Gruppe';

      if($property_type == FALSE)
        $content = $this->load->view('home/_index', $data, TRUE, TRUE);
      else
        $content = $this->load->view('properties/_' . $property_type, $data, TRUE, TRUE);

      $this->render($content);

    }

  }

  public function show($route) {

    if(ENVIRONMENT == 'production')
      $this->output->cache(240);

    $data = array();

    $data = $this->properties_model->get_entry_by_route($route); // TODO: sanitize XSS

    if(!$data['property'])
      show_404();

    $data['properties_menu'] = $this->properties_model->get_entries();
    $data['map'] = $this->_buildPropertyMap($data['property'], '574px', '300px', TRUE, FALSE, 14);

    $this->page['page_title'] = $data['property']['title'] . ' - DVI Gruppe';

    $content = $this->load->view('properties/_show', $data, TRUE, TRUE);
    $this->render($content);

  }

}

?>
