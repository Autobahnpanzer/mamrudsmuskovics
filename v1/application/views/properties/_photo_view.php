
<? if($properties) { ?>
<ul class="properties">
  <? foreach($properties as $property) { ?>
  <li>
    <a href="<?=base_url('/objekt/'.$property['route']);?>">
  <? if (isset($property['image_file_name'])) { ?>
      <img data-original="<?=rImage(asset_url($property['image_file_name']),380,320);?>" src="<?=base_url('assets/images/blank.gif');?>" class="lazy" alt="<?=$property['title'];?>, <?=$property['zip'];?> <?=$property['city'];?>" />
      <noscript>
        <img src="<?=rImage(asset_url($property['image_file_name']),380,320);?>" alt="<?=$property['title'];?>, <?=$property['zip'];?> <?=$property['city'];?>" />
      </noscript>
  <? } else { ?>
      <span class="missing-image"></span>
  <? } ?>
      <strong class="caption"><?=improve_type($property['title']);?></strong>
      <span class="caption"><?=$property['zip'];?> <?=$property['city'];?></span>
    </a>
  </li>
  <? } ?>
</ul>

<? } ?>
