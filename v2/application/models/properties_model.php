<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * 
 */
class Properties_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
		$this->table = 'properties';
    }
	
	function get_entries($type = FALSE) {
		
		if($type)
			$this->db->where($type, '1');
			
		$this->db->order_by('title', 'ASC');
		$result = $this->db->get($this->table);
		return $result->result_array();		
	}

	function get_entries_with_image($type = FALSE) {
	
		if($type)
			$this->db->where($type, '1');
	
		$this->db->order_by('title', 'ASC');
		$result = $this->db->get($this->table);
        $result = $result->result_array();
        
    	$properties = array();    		

    	foreach($result as $set) {
    	    $image = null;
    		
			$this->db->where('property_id', $set['id']);
			$this->db->order_by('is_frontpage', 'DESC');
			$this->db->limit(1);
			$image = $this->db->get('property_images');
			$image = $image->row_array();
			
			if(!empty($image)) {
	    		$set['image_file_name'] 	= $image['file_name'];
	    		$set['image_caption'] 		= $image['caption'];
	 			$set['image_credits'] 		= $image['credits'];				
			}		
    		
 			array_push($properties, $set);
    	}		
		
		return $properties;
	}
	
	function get_entry_by_route($route) {
		
		$data = array();
		
		$data['property'] = $this->db->where('route', $route)->get($this->table)->row_array();

		if(empty($data['property']))
			return false;
		 
		$data['images_count'] = $this->property_images_model->count_entries_by_property_id($data['property']['id']);
		$data['images'] = $this->property_images_model->get_entries_by_property_id_ordered($data['property']['id']);
		$data['frontpage_image'] = $this->property_images_model->get_frontpage_image_by_property_id($data['property']['id']);
		$data['links'] = $this->property_links_model->get_entries_by_property_id($data['property']['id']);			
		
		return $data;
	}
}

?>