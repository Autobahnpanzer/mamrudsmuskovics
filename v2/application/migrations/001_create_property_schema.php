<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_property_schema extends CI_Migration {

	public function up()
	{
		$this->dbforge->add_field(array(
			'id' => array(
				'type' => 'INT',
				'constraint' => 9,
				'unsigned' => TRUE,
				'auto_increment' => TRUE,
				'primary_key' => TRUE
			),
			'title' => array(
				'type' => 'VARCHAR',
				'constraint' => '90'
			),
			'route' => array(
				'type' => 'VARCHAR',
				'constraint' => '90'
			),
			'body' => array(
				'type' => 'TEXT',
				'null' => TRUE
			),
			'statistics' => array(
				'type' => 'TEXT',
				'null' => TRUE
			),
			'street' => array(
				'type' => 'VARCHAR',
				'constraint' => '40'
			),
			'zip' => array(
				'type' => 'VARCHAR',
				'constraint' => '5'
			),
			'city' => array(
				'type' => 'VARCHAR',
				'constraint' => '30'
			),
			'district' => array(
				'type' => 'VARCHAR',
				'constraint' => '30'
			),
			'latitude' => array(
				'type' => 'DECIMAL',
				'constraint' => '18,12'
			),
			'longitude' => array(
				'type' => 'DECIMAL',
				'constraint' => '18,12'
			),
			'is_commercial' => array(
				'type' => 'BOOLEAN'
			),
			'is_residential' => array(
				'type' => 'BOOLEAN'
			),
			'is_development' => array(
				'type' => 'BOOLEAN'
			),
			'is_fonds' => array(
				'type' => 'BOOLEAN'
			),
			'category' => array(
				'type' => 'VARCHAR',
				'constraint' => '60'
			),
			'date_updated' => array(
				'type' => 'TIMESTAMP'
			)
		));
		
		$this->dbforge->add_key('id', TRUE);
		$this->dbforge->add_key(array('is_commercial','is_residential','is_development','is_fonds', 'route','category'));
		
		$this->dbforge->create_table('properties');
		
		$this->dbforge->add_field(array(
			'id' => array(
				'type' => 'INT',
				'constraint' => 9,
				'unsigned' => TRUE,
				'auto_increment' => TRUE
			),
			'property_id' => array(
				'type' => 'INT',
				'constraint' => 9,
				'unsigned' => TRUE
			),
			'file_name' => array(
				'type' => 'VARCHAR',
				'constraint' => '255'
			),
			'caption' => array(
				'type' => 'VARCHAR',
				'constraint' => '140'
			),
			'credits' => array(
				'type' => 'VARCHAR',
				'constraint' => '90'
			),
			'is_frontpage' => array(
				'type' => 'BOOLEAN'
			),
			'date_updated' => array(
				'type' => 'TIMESTAMP'
			)
		));
		
		$this->dbforge->add_key('id', TRUE);
		$this->dbforge->add_key(array('property_id','is_frontpage'));
		
		$this->dbforge->create_table('property_images');
		
		$this->dbforge->add_field(array(
			'id' => array(
				'type' => 'INT',
				'constraint' => 9,
				'unsigned' => TRUE,
				'auto_increment' => TRUE
			),
			'property_id' => array(
				'type' => 'INT',
				'constraint' => 9,
				'unsigned' => TRUE
			),
			'link_text' => array(
				'type' => 'VARCHAR',
				'constraint' => '90'
			),
			'url' => array(
				'type' => 'VARCHAR',
				'constraint' => '255'
			),
			'date_updated' => array(
				'type' => 'TIMESTAMP'
			)
		));
		
		$this->dbforge->add_key('id', TRUE);
		$this->dbforge->add_key(array('property_id'));
		
		$this->dbforge->create_table('property_links');		
	}

	public function down()
	{
		$this->dbforge->drop_table('properties');
		$this->dbforge->drop_table('property_images');
		$this->dbforge->drop_table('property_links');
	}
	
}

?>