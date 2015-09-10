
<div class="  clearfix" id="main">
  <section class="grid_17 prefix_7">

  <?//TODO: consider using partials; ?>
  <? if($images_count) { ?>
    <a href="<?=base_url('/fotos/' . $property['route']);?>" class="photo"><img src="<?=rImage(asset_url($frontpage_image['file_name']),790,500);?>" width="100%" height="auto" alt="<?=$property['title'];?>" /></a>

    <ul class="thumbnails">
    <?
    $i = 1;
    foreach($images as $image) { ?>
      <li><a href="<?=base_url('/fotos/' . $property['route']);?>#canvas_<?=$i;?>"><img src="<?=rImage(asset_url($image['file_name']),32,32);?>" width="32" height="32" alt="" /></a></li>
    <?
      $i++;
    } ?>
    </ul>
  <? } ?>

    <div class="boxed">

    <? if($images_count) { ?>
      <?=anchor('/fotos/' . $property['route'], pluralize($images_count, 'Bild', 'Bilder'), array('class'=>'btn _margin-bottom next photo-album')); ?>
    <? } ?>

      <h2 class="title"><?=improve_type($property['title']);?></h2>

      <div class="abstract">
        <?=simple_format($property['body']);?>
      </div>

      <table class="default data" summary="">
      <tbody>
      <tr>
        <th>Ort</th>
        <td>
          <?=$property['street'] != '' ? $property['street'] . '<br />' : ''; ?>
          <?=$property['zip'];?> <?=$property['city'];?> <?=$property['district'];?>
        </td>
      </tr>
      <tr>
        <th>Objekttyp</th>
        <td>
          <?=$property['is_residential'] ? 'Wohnen<br />' : ''; ?>
          <?=$property['is_commercial'] ? 'Gewerbe<br />' : ''; ?>
          <?=$property['is_development'] ? 'Entwicklung<br />' : ''; ?>
          <?=$property['is_fonds'] ? 'Fonds<br />' : ''; ?>
          <?=$property['category'] ? $property['category'].'<br />' : '';?>
        </td>
      </tr>
      <?=$property['statistics'];?>

    <?//TODO: consider using partials; ?>
    <? if(sizeof($links) > 0) { ?>
      <tr>
        <th>Links</th>
        <td>
        <? foreach($links as $link):
            if(empty($link['link_text']))
              $link['link_text'] = $link['url'];
        ?>
          <?=anchor($link['url'], $link['link_text'].'&nbsp;&rarr;');?><br />
        <? endforeach; ?>
        </td>
      </tr>
    <? } ?>
      </tbody>
      </table>

      <?= $map['html']; ?>
      <?= $map['js']; ?>

    </div>

  </section>
</div>
