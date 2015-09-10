<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="de"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="de"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="de"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="de"> <!--<![endif]-->
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<?= isset($meta) ? $meta : $this->load->view('layouts/_meta'); ?>

<link rel="profile" href="http://microformats.org/profile/hcard">
<link rel="shortcut icon" type="image/x-icon" href="<?=base_url('favicon.ico');?>" />

<!--[if lt IE 8]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE8.js"></script>
<![endif]-->
<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<?=$this->config->config['App']['webfonts'];?>

<?= Assets::css(array(
            'reset.css',
            'grid.css',
            'base.css',
            'page.css',
            'layout.css',
            'default.css',
            'mediaqueries.css'
            )); ?>

<?//TODO: modernizr ?>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>!window.jQuery && document.write(unescape('%3Cscript src="<?=base_url('assets/js/jquery-1.7.1.min.js');?>"%3E%3C/script%3E'))</script>
<?= Assets::js(array(  'jquery-ui-1.8.18.custom.min.js',
            'jquery.waypoints.min.js',
            'jquery.smoothscroll.js',
            'jquery.lazyload.min.js',
            'application.js')); //TODO: consider conditional & asynchronous loading ?>

<? $this->load->view('shared/_analytics'); ?>

<title><?= $page_title; ?></title>

</head>
<body id="<?= $body_id; ?>" class="<?= $body_class; ?>">

<?= isset($header) ? $header : $this->load->view('layouts/_header'); ?>
<?= $content; ?>
<?= isset($footer) ? $footer : $this->load->view('layouts/_footer'); ?>

<!-- Time: <?= $this->benchmark->elapsed_time(); ?> / Mem: <?= $this->benchmark->memory_usage(); ?> -->

</body>
</html>
