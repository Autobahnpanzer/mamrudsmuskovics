<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * @author JU
 */
class Sitemaps_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function get_urls() {
    
		$urls = array();
		
		/* properties */

    	$urls += $this->db->select('CONCAT("'.base_url(PROPERTY_PATH).'/", route) as url, (0.6) as priority', FALSE)->
    					from('properties')->
    					get()->result_array();
    	
    	return $urls;
    }
	
}

/* End of file sitemaps_model.php */
/* Location: ./application/models/sitemaps_model.php */