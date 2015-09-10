<?php
/**
* MY_Controller
* @access	 		public
* @author 			Jan Unger
* @copyright 		(c) 2012 ZUKD
* @package 			MamrudSmuskovics
* @since 			2012-10-22
* @version 			1.5.0
*/
class MY_Controller extends CI_Controller
{

	// VARS
	protected $page = array(	'body_id'	 	=> '', 
								'body_class'	=> 'default-layout',
								'canonical_url' => '',
								'layout' 		=> 'layouts/default');
	protected $controller;
	protected $method;
		
	function __construct() {
		parent::__construct();

        // shortcuts for App config
        $app = $this->config->item('App');
		$this->uploads_dir 			= $app['uploads_dir'];
		$this->db_files_dir 		= $app['db_files_dir'];
		$this->assets_cache_dir 	= $app['assets_cache_dir'];
		$this->upload_max_filesize 	= $app['upload_max_filesize'];

        $this->controller = $this->router->fetch_class();
        $this->method = $this->router->fetch_method();	
	}
	
    // --------------------------------------------------------------------

	protected function render($content = false, $data = array()) {
	
		// if no view is given, resort to convention
		
		if ($content == false) {
			$content = $this->load->view($this->controller . '/_' . $this->method, $data, TRUE, TRUE);
		} elseif (is_array($content) && empty($data)) {
			$data = $content;
			$content = $this->load->view($this->controller . '/_' . $this->method, $data, TRUE, TRUE);
		}
			
		$view_data = array();
		
		if(isset($data['robots']) && $data['robots'] == 'noindex')
			$this->page['meta'] = $this->load->view('shared/_meta_noindex', array(), TRUE);
	
		if($this->page['body_id'] == '')
			$this->page['body_id'] = 'ms-' . $this->controller . '-' . $this->method;
		
		$view_data['content'] = $content;
		$view_data += $this->page;

		$this->load->view($this->page['layout'], $view_data);

	}

	/**
	* provides requested view-type for properties-index
	* (helper?)
	*/
	public function _getViewType() {
	
		$allowed_view_types = array('list', 'photo', 'map');

		if(in_array($this->input->get_post('v', TRUE), $allowed_view_types)) {
			$view_type = $this->input->get_post('v', TRUE);
		} elseif(in_array($this->input->cookie('MSG_v', TRUE), $allowed_view_types)) {
			$view_type = $this->input->cookie('MSG_v', TRUE);
		} else {
			$view_type = 'photo';
		}
			
		$cookie = array(
		    'name'   => 'v',
    		'value'  => $view_type,
    		'expire' => '2592000',
    		'prefix' => 'MSG_'
		);
		
		$this->input->set_cookie($cookie); 			
	
		return $view_type;
	}
	
	/**
	* provide properties map
	* (helper?)
	*/	
	public function _buildPropertiesMap($properties, $width = FALSE, $height = '600px', $center = '52.30, 13.25', $zoom = 'auto') {

		$this->load->library('googlemaps');		
		$config = $this->config->item('Maps');
		
		$config['map_height'] = $height;
		$config['center'] = $center;
		$config['zoom'] = $zoom;
		if($width)
			$config['map_width'] = $width;
			
		$this->googlemaps->initialize($config);

		$marker = array();
		$i = 1;
		
		foreach($properties as $property) {
			$marker['position'] = $property['latitude'].', '.$property['longitude'];
			$marker['onclick'] = 'self.location.href="' . base_url('/objekt/'.$property['route']) . '"';
			$marker['icon'] = base_url($this->config->config['App']['assets_images_path'].'markers/p_number_'.$i.'.png');
			$this->googlemaps->add_marker($marker);
			$i++;
		}

		return $this->googlemaps->create_map();
	}
	
	/**
	* provide property map
	* (helper?)
	*/	
	public function _buildPropertyMap($property, $width = FALSE, $height = '300px', $marker = FALSE, $center = FALSE, $zoom = '15') {

		$this->load->library('googlemaps');		
		$config = $this->config->item('Maps');
		
		$config['map_height'] = $height;
		$config['zoom'] = $zoom;
		if($width)
			$config['map_width'] = $width;
		if($center)
			$config['center'] = $center;
		else
			$config['center'] = $property['latitude'].', '.$property['longitude'];
		
		$this->googlemaps->initialize($config);

		if($marker) {
			$marker = array();
			$marker['icon'] = base_url($this->config->config['App']['assets_images_path'].'markers/circle_i_64x64.png');
			$marker['position'] = $property['latitude'].', '.$property['longitude'];		
			$this->googlemaps->add_marker($marker);
		}

		return $this->googlemaps->create_map();
	}
	
}
/* End of file MY_Controller.php */
/* Location: ./system/application/libraries/MY_Controller.php */
?>