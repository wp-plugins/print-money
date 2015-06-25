<?php 
include('../../../wp-load.php');

$my_query = new WP_Query(array(
	'post_type' => 'image_count',
	'post_status' => 'publish',
	'posts_per_page' => -1,
));
if( $my_query->have_posts() ) {
	while ($my_query->have_posts()) : $my_query->the_post();
		$images[] = get_the_title();
		
		// Update Image Count
		if ( get_the_title() == $_POST['img_url']  ) {
			$content = explode('|',get_the_content());
			$update_count = $content[1] + 1;
			echo $gid;
			$my_post = array(
			  'ID'           => get_the_ID(),
			  'post_title'   => $_POST['img_url'],
			  'post_content' => $content[0].'|'.$update_count,
			);
			wp_update_post( $my_post );
		}
		
	endwhile;
} wp_reset_postdata();
			
if ( !in_array($_POST['img_url'],$images) ) {
	// Add New Image Count
	$my_post = array(
	  'post_type'     => 'image_count',
	  'post_title'    => $_POST['img_url'],
	  'post_content'  => $_POST['current_url'].'|1',
	  'post_status'   => 'publish',
	);
	wp_insert_post( $my_post );
	
}
	
	