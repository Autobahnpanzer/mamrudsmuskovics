<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sitemaps extends CI_Controller {

	function __construct() {
        parent::__construct();
    }

	public function index() {

		if(ENVIRONMENT == 'production')
			$this->output->cache(240);
		
		$data = array();
		
		$this->load->model('sitemaps_model');
		$data['urls'] = $this->sitemaps_model->get_urls();
		
		$this->load->view("sitemaps/index", $data);
		
	}

}

/* End of file sitemaps.php */
/* Location: ./application/controllers/sitemaps.php */