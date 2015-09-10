<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| Config for App Settings
|--------------------------------------------------------------------------
|
*/

$config['App']['uploads_dir'] = realpath(APPPATH . '../') . '/assets/uploads/';
$config['App']['db_files_dir'] = realpath(APPPATH . '../') . '/assets/db/';
$config['App']['assets_cache_path'] = '/assets/cache/';
$config['App']['assets_cache_dir'] = realpath(APPPATH . '../') . '/assets/cache/';
$config['App']['assets_images_path'] = '/assets/images/';
$config['App']['upload_max_filesize'] = 20480; //ini_get('upload_max_filesize')
$config['App']['webfonts'] = '<link type="text/css" rel="stylesheet" href="http://fast.fonts.com/cssapi/751b2931-99f5-47c0-97e3-d4fd43ad6901.css"/>';


/* End of file app.php */
/* Location: ./application/config/app.php */
