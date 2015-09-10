<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * 
 */
class Property_images_model extends CI_Model {

    function __construct() {
        parent::__construct();
		$this->table = 'property_images';
    }

	function get_frontpage_image_by_property_id($id) {
		$this->db->where('property_id', $id);
		$this->db->order_by('is_frontpage', 'DESC');
		$this->db->limit(1);
		$return = $this->db->get($this->table);
		$return = $return->row_array();
		if(!empty($return))
		  return $return;
		else
		  return false;
	}
		
	function count_entries_by_property_id($id) {
		return $this->db->where('property_id', $id)->count_all_results($this->table);
	}
			
	function get_entries_where($key = '', $value) {
		$this->db->where($key, $value);
		$result = $this->db->get($this->table);
		return $result->result_array();			
	}

	function get_entries_by_property_id_ordered($id) {
		$this->db->where('property_id', $id);
		$this->db->order_by('is_frontpage', 'DESC');
		$result = $this->db->get($this->table);
		return $result->result_array();		
	}
				
	function get_entry($id) {
		$this->db->where('id', $id);
		$result = $this->db->get($this->table);
		$return = $return->row_array();
		if(!empty($return))
		  return $return;
		else
		  return false;		
	}
	
	function save($object_id, $path, $caption = '', $credits = '', $is_frontpage = 0) {
		$data = array(
		   'property_id' 	=> $object_id,
		   'file_name' 		=> $path,
		   'caption' 		=> $caption,
		   'credits' 		=> $credits,
		   'is_frontpage' 	=> $is_frontpage
		);
		$this->db->insert($this->table, $data); 		
	}
	
	function delete_by_property_id($id) {
		$this->db->delete($this->table, array('property_id' => $id)); 
	}
}

?>