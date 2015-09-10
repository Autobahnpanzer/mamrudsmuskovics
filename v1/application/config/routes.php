<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|  example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|  http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|  $route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|  $route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller']   = "home";
$route['404_override']       = '';
$route['sitemap\.xml']       = "sitemaps/index";

// PATHS

define('FUNDS_PATH', 'fonds');
define('ABOUT_PATH', 'ueber-uns');
define('IMPRINT_PATH', 'impressum');
define('CONTACT_PATH', 'kontakt');
define('DVI_PATH', 'dvi');
define('PROFILES_PATH', 'ankaufsprofile');
define('PROPERTIES_PATH', 'objekte');
define('PROPERTY_PATH', 'objekt');
define('PHOTOS_PATH', 'fotos');

// PUBLIC WEBSITE

$route[FUNDS_PATH]                       = 'home/funds';
$route[ABOUT_PATH]                       = 'home/about';
$route[IMPRINT_PATH]                     = 'home/imprint';
$route[CONTACT_PATH]                     = 'contact/index';
$route[PROFILES_PATH]                    = 'home/profiles';
$route[PROPERTIES_PATH.'/(wohnen|gewerbe|entwicklung)']   = 'properties/index/$1';
$route[PROPERTY_PATH.'/(:any)']               = 'properties/show/$1';
$route[PHOTOS_PATH.'/(:any)']                 = 'property_images/show/$1';

// BACKEND/ADMIN

$route['import']                 = "property_images/import_images";
$route['upload']                 = "property_images/upload";

/* End of file routes.php */
/* Location: ./application/config/routes.php */
