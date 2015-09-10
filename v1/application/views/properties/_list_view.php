
<? if($properties) { ?>

<table class="default properties">
<tbody>
  <? foreach($properties as $property) { ?>
  <tr class="clickable <?=(isset($current_id) && $current_id == $property['id']) ? 'active' : ''; ?>" onclick="self.location.href='<?=base_url('/objekt/'.$property['route']);?>';">
    <td class="flag residential">
      <?= $property['is_residential'] ? '<abbr title="Wohnen" lang="de" xml:lang="de">W</abbr>' : ''; ?>
    </td>
    <td class="flag commercial">
      <?= $property['is_commercial'] ? '<abbr title="Gewerbe" lang="de" xml:lang="de">G</abbr>' : ''; ?>
    </td>
    <td class="flag development">
      <?= $property['is_development'] ? '<abbr title="Entwicklung" lang="de" xml:lang="de">E</abbr>' : ''; ?>
    </td>
    <th>
      <?=anchor('/objekt/'.$property['route'],improve_type($property['title']));?>
    </th>
    <td class="zip">
      <?= $property['zip']; ?>
    </td>
    <td class="city">
      <?= $property['city']; ?>
      <?= $property['district']; ?>
    </td>
  </tr>
  <? } ?>
</tbody>
</table>

<? } ?>
