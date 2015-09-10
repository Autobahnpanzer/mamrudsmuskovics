<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * 
 */
class Property_links_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
		$this->table = 'property_links';
    }

	function get_entries_by_property_id($id) {
		$this->db->where('property_id', $id);
		$result = $this->db->get($this->table);
		return $result->result_array();		
	}

}

?>