<?php
/**
 * Plugin Name: Print Money	
 * Description: Add a hover button to any Word Press image to enable your users to buy prints and photo gifts sucha as magnets, frames, mousepads and more. Print Money pays site owners 85% of sales.
 * Plugin URI: http://dotphoto.com
 * Author: David Ahmad
 * Author URI: http://vbsocial.com
 * Version: 2.0
 * Text Domain: Print-Money
 * License: GPL2
 * Copyright 2015 David Ahmad
*/

define('PLUGIN_URL',plugin_dir_url( __FILE__ ));

/*
*  Default Settings 
------------------------------------------------------------*/
function myplugin_activate() {
	$default = array(
		'container' => array('entry-content'),
		'button_text' => 'Print Me',
		'position' => 'bottom-left',
		'epage' => array(),
		'return_url' => site_url(),
		'affliateID' => site_url(),
	);
	update_option('printmoney_settings',$default);
}
register_activation_hook( __FILE__, 'myplugin_activate' );


/*
*  Register Scripts Front
------------------------------------------------------------*/
function register_scripts() {
	$settings = get_option('printmoney_settings',true);
	if ( !is_page( $settings['epage'] ) || empty($settings['epage']) ) {
		wp_enqueue_script( 'printmoney-script',  PLUGIN_URL . 'js/scripts.js', array( 'jquery' ));
		wp_enqueue_style( 'printmoney-style', PLUGIN_URL . 'css/style.css', 20, null );
		
		// Localize the script with new data
		wp_localize_script( 'printmoney-script', 'pm_settings', $settings );
		wp_localize_script( 'printmoney-script', 'click_count', array('url'=>PLUGIN_URL . 'click-count.php' ));
	}
}

add_action( 'wp_enqueue_scripts', 'register_scripts' );

/*
*  Register Scripts Admin
------------------------------------------------------------*/
function load_custom_wp_admin_style() {
       wp_enqueue_style( 'printmoney-admin-style', PLUGIN_URL . '/css/admin.css', array(), null );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );


/*
*  Add Admin Menu
------------------------------------------------------------*/
add_action( 'admin_menu', 'register_print_money_menu_page' );
function register_print_money_menu_page(){
	add_menu_page( 'Print Money', 'Print Money', 'manage_options', 'print-money', 'print_money_admin', PLUGIN_URL.'/print.png', 81 ); 
}

function print_money_admin(){
	include plugin_dir_path( __FILE__ ).'/admin.php';
}

/*
*  Register Post Type for Image Count
------------------------------------------------------------*/
function codex_custom_init() {
    $args = array(
      'public' => false,
      'label'  => 'image_count'
    );
    register_post_type( 'image_count', $args );
}
add_action( 'init', 'codex_custom_init' );