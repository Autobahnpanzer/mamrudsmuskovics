
<?= isset($status) ? $status : null; ?>

<?= form_open_multipart('upload'); ?>
<fieldset>	
	<?= form_upload('userfile'); ?>
</fieldset>
<fieldset>
	<?= form_label('Objekt', 'object_id'); ?>
	<select name="object_id" id="object_id">
		<?foreach($properties as $property):?>
		<option value="<?=$property['id'];?>"><?=$property['title'];?> (<?=$property['id'];?>)</option>
		<?endforeach;?>
	</select>
</fieldset>
<fieldset>
	<label><?= form_checkbox('replace_old_files', '1', TRUE); ?> Dateien ersetzen</label>
</fieldset>
<fieldset>
	<?= form_submit('submit', 'Ok'); ?>	
</fieldset>
<?= form_close(); ?>
