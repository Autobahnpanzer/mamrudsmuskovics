
<article id="album">
	
	<header>
		<h1><?=anchor('/','MamrudSmuskovics');?></h1>
		<h2><?=improve_type($property['title']);?></h2>
		<address><?=$property['zip'];?> <?=$property['city'];?></address>
		<?=anchor('/objekt/' . $property['route'], 'Zurück', array('class' => 'btn back', 'onmouseover' => ''));?>
	</header>

	<nav>
		<a href="#" class="prev">zurück</a>
<?
$i = 1;
foreach($images as $image) { ?>
		<a href="#canvas_<?=$i;?>" class="thumbnail"><img src="<?=rImage(asset_url($image['file_name']),32,32);?>" width="32" height="32" alt="<?=$i;?>" /></a>
<?
	$i++;
} ?>
		<a href="#" class="next">weiter</a>
	</nav>

<?
$i = 1;
foreach($images as $image) { ?>
	<section class="canvas" id="canvas_<?=$i;?>">
	<? if($i == 1) { ?>
		<img src="<?=asset_url($image['file_name']);?>" />
	<? } else { ?>	
		<img data-original="<?=asset_url($image['file_name']);?>" src="<?=base_url('assets/images/spinner_01.gif');?>" alt="" class="lazy" />
		<noscript>
			<img src="<?=asset_url($image['file_name']);?>" />
		</noscript>
	<? } ?>
	</section>	
<?
	$i++;
} ?>

</article>