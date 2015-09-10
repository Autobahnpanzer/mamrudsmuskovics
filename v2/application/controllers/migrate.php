<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

// ------------------------------------------------------------------------

/**
 * Migrate Class
 *
 * Utility main controller.
 *
 */
class Migrate extends MY_Controller {

	function __construct() {

		parent::__construct();

	}
	
	function index() {
		
		$this->load->library('migration');

		if ( ! $this->migration->current())
		{
			show_error($this->migration->error_string());
		}
		
	}

}

?>