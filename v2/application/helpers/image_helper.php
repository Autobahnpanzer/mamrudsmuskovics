<?php
 
/**
* RESIZE AND CACHE IMAGES
* v0.53a 10/12/12
*/    
if (!function_exists('rImage')) {
	function rImage($image_path, $width = 0, $height = 0, $force_resize = TRUE, $force_rgb = TRUE) {

		// TODO: refactor
	
		//Get the Codeigniter object by reference
		$CI = & get_instance();

		// config

		$file_info = array();
		$is_remote = FALSE;
		$is_online = TRUE;
		$is_cached = FALSE;
		$origin_last_modified = NULL;
		$cache_dir = $CI->config->config['App']['assets_cache_path'];
		$login_handle = '';
	
		// if image_path is a full URL, check if this equals base_url()
		$path = str_ireplace(base_url(), '', $image_path, $count);
		
		if($count == 1)
			$image_path = $path;
	
		$absolute_path = ".";

		if(absolute_path())
			$absolute_path = absolute_path();
		else
			$absolute_path = realpath(APPPATH . '../');
		
		// cache path
		$cache_path = $absolute_path.$cache_dir; /* should be writable */
	
		// return $image_path, if cache dir is not writable
		if(!is_writable($cache_path)) {
			log_message('debug', 'rImage, cache dir ['.$cache_path.'] not writable');
			return $image_path;
		}

		// check file system and remote, if file exists
		if (!file_exists($image_path)) {
			log_message('debug', 'rImage, image ['.$image_path.'] not local');
			$file = fopen($login_handle.$image_path, "r");
			if (!$file) {
				$is_online = FALSE; // maybe we are offline, try to get locally cached version
			}
			$url_components = parse_url($login_handle.$image_path);
			$path_components = explode("/", $url_components['path']);
			$file_components = explode(".", end($path_components));
			$file_info['filename'] = $file_components[0];
			$file_info['extension'] = isset($file_components[1]) ? $file_components[1] : FALSE;
			if($is_online)
				$origin_last_modified = GetRemoteLastModified($login_handle.$image_path);
			$is_remote = TRUE;
		}else{
			$path_components = pathinfo($image_path);
			$file_info['filename'] = $path_components['filename'];
			$file_info['extension'] = '';
			if(isset($path_components['extension']))
				$file_info['extension'] = $path_components['extension'];	
			$origin_last_modified = filemtime($image_path);
		}
		
		//The new generated filename we want
		$new_file_name = $file_info['filename'] . '_' . $width . 'x' . $height;
		if($file_info['extension'] != '')
			$new_file_name = $new_file_name . '.' . $file_info['extension'];
		$new_image_path = $cache_path . $new_file_name;
				
		log_message('debug', 'rImage, new image path is: ' . $new_image_path);
		
		if(file_exists($new_image_path))
			$is_cached = TRUE;

		// not cached, not online, return $image_path
		if(!$is_cached && !$is_online && $is_remote)
			return $image_path;

		//The first time the image is requested, or original image is newer than our cache image
		if(!$is_cached || (filemtime($new_image_path) < $origin_last_modified) || ($is_cached && !$is_online && $is_remote)) {
			$CI->load->library('image_lib');

			// copy, if remote
			if($is_remote) {
				$tmp_file = time().mt_rand();
				copy($image_path, $cache_path.$tmp_file); // needs PHP5 and the HTTP stream wrapper enabled
				$image_path = $cache_path.$tmp_file;
			}
			
			//The original sizes
			$image_info = @getimagesize($image_path);
			
			if(isset($image_info['channels']))
				$color_mode = $image_info['channels']; /* 3 = RGB, 4 = CMYK */
			else
				$color_mode = 3;
				
			$original_width = $image_info[0];
			$original_height = $image_info[1];

			log_message('debug', 'rImage, image path is: ' . $image_path);
					
			if($original_width < 30 && $original_height < 30) {
				log_message('debug', 'rImage: image is too small ('. $original_width . "x" . $original_height . ')');
				return $image_path;
			}					
					
			if($original_width * $original_height > (1600 * 1200)) {
				log_message('debug', 'rImage: this one is too big ('. $original_width . "x" . $original_height . ')');
				return $image_path;
			}			
			
			$ratio = $original_width / $original_height;
			
			//The requested sizes
			$requested_width = $width;
			$requested_height = $height;
			
			if($force_resize == FALSE && (($requested_width > $original_width) || ($requested_height > $original_height))) {
				
				if($color_mode == 4 && $force_rgb == TRUE) {
					log_message('debug', 'rImage, force RGB');
					// force rgb by pseudo-resizing
					$config = array();
					$config['image_library'] = 'gd2';
					$config['source_image'] = $image_path;
					$config['new_image'] = $new_image_path;
					$config['maintain_ratio'] = FALSE;
					$config['height'] = $original_height;
					$config['width'] = $original_width;
					$CI->image_lib->initialize($config);
					$CI->image_lib->resize();
					$CI->image_lib->clear();					
				} else {					
					// do nothing but copy
					copy($image_path, $new_image_path);
				}
				
			} else {
				
				//Initialising 
				$new_width = 0;
				$new_height = 0;
				
				//Calculations
				if ($requested_width > $requested_height) {
					$new_width = $requested_width;
					$new_height = $new_width / $ratio;
					if ($requested_height == 0)
						$requested_height = $new_height;
					
					if ($new_height < $requested_height) {
						$new_height = $requested_height;
						$new_width = $new_height * $ratio;
					}
				
				}
				else {
					$new_height = $requested_height;
					$new_width = $new_height * $ratio;
					if ($requested_width == 0)
						$requested_width = $new_width;
					
					if ($new_width < $requested_width) {
						$new_width = $requested_width;
						$new_height = $new_width / $ratio;
					}
				}
				
				$new_width = ceil($new_width);
				$new_height = ceil($new_height);
				
				log_message('debug', 'rImage, resizing');
				//Resizing
				$config = array();
				$config['image_library'] = 'gd2';
				$config['source_image'] = $image_path;
				$config['new_image'] = $new_image_path;
				$config['maintain_ratio'] = FALSE;
				$config['height'] = $new_height;
				$config['width'] = $new_width;
				$CI->image_lib->initialize($config);
				$CI->image_lib->resize();
				$CI->image_lib->clear();
				
				//Crop if both width and height are not zero
				if (($width != 0) && ($height != 0)) {
					$x_axis = floor(($new_width - $width) / 2);
					$y_axis = floor(($new_height - $height) / 2);
					
					log_message('debug', 'rImage, cropping');
					//Cropping
					$config = array();
					$config['source_image'] = $new_image_path;
					$config['maintain_ratio'] = FALSE;
					$config['new_image'] = $new_image_path;
					$config['width'] = $width;
					$config['height'] = $height;
					$config['x_axis'] = $x_axis;
					$config['y_axis'] = $y_axis;
					$CI->image_lib->initialize($config);
					$CI->image_lib->crop();
					$CI->image_lib->clear();
				}
			
			}
			
			// delete local temp file (copied from remote to process)
			if($is_remote) {
				unlink($cache_path.$tmp_file);
			}			
		}
		
		return base_url($cache_dir.$new_file_name); // dirty hack
	}
}

/* necessary for rImage(), consider moving to appropriate helper */
if (!function_exists('GetRemoteLastModified')) {
	function GetRemoteLastModified($uri) {
	    // default
	    $unixtime = 0;
	   
	    $fp = fopen( $uri, "r" );
	    if( !$fp ) {return;}
	   
	    $MetaData = stream_get_meta_data( $fp );
	       
	    foreach( $MetaData['wrapper_data'] as $response )
	    {
	        // case: redirection
	        if( substr( strtolower($response), 0, 10 ) == 'location: ' )
	        {
	            $newUri = substr( $response, 10 );
	            fclose( $fp );
	            return GetRemoteLastModified( $newUri );
	        }
	        // case: last-modified
	        elseif( substr( strtolower($response), 0, 15 ) == 'last-modified: ' )
	        {
	            $unixtime = strtotime( substr($response, 15) );
	            break;
	        }
	    }
	    fclose( $fp );
	    return $unixtime;
	}
}	
	
?>