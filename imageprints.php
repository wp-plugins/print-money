<?php


function deleteDataMany($btn, $id) {

if($_POST[$btn]) {

    foreach ($id as $key => $value) {

        $pid = wp_delete_post($value, 1);
    }

    if( is_wp_error( $pid ) )
    {

        echo '<div class="error"><p>'.$pid->get_error_message().'</p></div>';

    } else {

        echo '<div class="updated"><p>Updated!</p></div>';

    }

}


}

    function doData($btn, $inorup, $postTitle, $postSlug, $postContent, $postType) {

        if($_POST[$btn]) {

            if($_POST[$inorup] == 0) {
                $my_post = array(
                    'post_title' => $postTitle,
                    'post_name' => $postSlug,
                    'post_content' => $postContent,
                    'post_status' => 'publish',
                    'post_type' => $postType
                );

                $pid = wp_insert_post($my_post);

            } elseif ($_POST[$inorup] == 1) {

                $my_post = array(
                    'ID' => $_POST['ID'],
                    'post_title' => $postTitle,
                    'post_name' => $postSlug,
                    'post_content' => $postContent,
                    'post_status' => 'publish',
                    'post_type' => $postType
                );

                $pid = wp_update_post($my_post);
            }

            if( is_wp_error( $pid ) )
            {

                echo '<div class="error"><p>'.$pid->get_error_message().'</p></div>';

            } else {

               echo '<div class="updated"><p>Updated!</p></div>';

            }


        }

    }



    function inorup($data = NULL) {

        if($data == NULL) {
           return '<input type="hidden" name="insert-or-update" value="0">';
        } else {
            return '<input type="hidden" name="insert-or-update" value="1">';
        }

    }
?>

<div class="wrap">
	<div id="icon-plugins" class="icon32"></div>
	<!-- <h2><?php _e( 'DX Plugin Base', 'dxbase' ); ?></h2> -->

	<div class="dx-help-page">
		<div class="content alignleft">

			<h2 class='page-welcome'>Print Money <span>Plugin</span></h2>

			<div id="dx-help-content">

					<h2><?php _e( "Let's get started", 'dxbase' ); ?></h2>
						
<br><br>

                <h3>Theme Compatibility</h3>

                <p>If the image is not showing on your theme, you'll have to add a class identifier for your theme. You can add multiple classes to target parts of your site Not sure what it is, try "blog" and update. <small>(other typical classes to try: blog,entry-content,entry-header)</small></p>

                <?php

                doData('save-img-print-btn-class', 'insert-or-update', 'img-print-btn-class', 'img-print-btn-class', $_POST['img-print-btn-class'], 'img-print-btn-class');

                $page = get_page_by_path("img-print-btn-class", OBJECT, "img-print-btn-class");

                $title = get_post($page->ID);

                ?>


                <form method="POST">

                    <?php echo inorup($title); ?>

                    <input type="hidden" name="ID" value="<?php echo $page->ID; ?>">

                    <input type="text" name="img-print-btn-class" value="<?php echo $title->post_content; ?> " style="width:100%;">
                    <br><br>
                    <input class="button-primary" style="float:right;"  type="submit" name="save-img-print-btn-class" value="<?php _e('Update'); ?>"  />
                </form>

                <br>
                
                <h3>Button Text</h3>

                <p>Please enter the text you want to display on the button <small>(ex: Buy Me)</small></p>

                <?php

                doData('save-img-print-btn-txt', 'insert-or-update', 'img-print-btn-txt', 'img-print-btn-txt', $_POST['img-print-btn-txt'], 'img-print-btn-txt');

                $page = get_page_by_path("img-print-btn-txt", OBJECT, "img-print-btn-txt");

                $title = get_post($page->ID);

                ?>


                <form method="POST">

                    <?php echo inorup($title); ?>

                    <input type="hidden" name="ID" value="<?php echo $page->ID; ?>">

                    <input type="text" name="img-print-btn-txt" value="<?php echo $title->post_content; ?> " style="width:100%;">
                    <br><br>
                    <input class="button-primary" style="float:right;"  type="submit" name="save-img-print-btn-txt" value="<?php _e('Update'); ?>"  />
                </form>

                <br>
					<form  method="POST">



						
							<h3>Button will show for everyone except...</h3>
<br>
                       
                        <?php

                        deleteDataMany('img-print-btn-roles-update', $_POST['delete']);

                        doData('img-print-btn-roles-save', 'insert-or-update', 'img-print-btn-roles', 'img-print-btn-roles', $_POST['img-print-btn-roles'], 'img-print-btn-roles');



                        ?>



                        <select name="img-print-btn-roles">
                            <?php wp_dropdown_roles(); ?>
                        </select>


                        <input class="button-primary" type="submit" name="img-print-btn-roles-save" value="<?php _e('Block'); ?>" id="submitbutton" />



<br><br>
                        <table class="widefat">
                            <thead>
                            <tr>
                                <th>Delete</th>
                                <th>Role</th>
                            </tr>
                            </thead>

                            <tbody>

                            <?php
                            $args=array(
                            'post_type' => 'img-print-btn-roles',
                            'post_status' => 'publish',
                            'posts_per_page' => -1,
                            'caller_get_posts'=> 1
                            );

                            $my_query = new WP_Query($args);
                            if( $my_query->have_posts() ) {
                            while ($my_query->have_posts()) : $my_query->the_post(); ?>

                                <tr>
                                    <td><input type="checkbox" name="delete[]" value="<?php echo the_ID(); ?>"></td>
                                    <td><?php the_content(); ?></td>
                                </tr>

                            <?php
                            endwhile;
                            }
                            wp_reset_query();  // Restore global post data stomped by the_post().
                            ?>


                            </tbody>
                        </table>


<br>
                        <input class="button-primary" style="float:right;" type="submit" name="img-print-btn-roles-update" value="<?php _e('Update'); ?>"  />

                    </form> <!-- end of #dxtemplate-form -->

                <form  method="POST">

                    <?php echo inorup(NULL); ?>


                    <h3>Set where the button should appear</h3>

             <br>

                    <?php

                    deleteDataMany('img-print-btn-postions-update', $_POST['delete']);

                    doData('img-print-btn-postions-save', 'insert-or-update', 'img-print-btn-postions', 'img-print-btn-postions', $_POST['img-print-btn-postions'], 'img-print-btn-postio');
					$page2 = get_page_by_path("img-print-btn-postions", OBJECT, "img-print-btn-postio");



                    if($page2 == NULL) {
                    ?>


                    <select name="img-print-btn-postions">
                        <option value="above-img">Above Image</option>
                        <option value="below-img">Below Image</option>
                        <option value="on-img-btm-right">On top of image, bottom right</option>
                        <option value="on-img-btm-left">On top of image, bottom left</option>
                        <option value="on-img-top-right">On top of image, top right  </option>
                        <option value="on-img-top-right">On top of image, top left </option>
                        <option value="on-img-hover-btm-right">Only on hover, bottom right</option>
                    </select>


                    <input class="button-primary" type="submit" name="img-print-btn-postions-save" value="<?php _e('Set location'); ?>"  />



                    <br><br>
                    <?php  } ?>
                    <table class="widefat">
                        <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Postion</th>
                        </tr>
                        </thead>

                        <tbody>

                        <?php
                        $args=array(
                            'post_type' => 'img-print-btn-postio',
                            'post_status' => 'publish',
                            'posts_per_page' => -1,
                            'caller_get_posts'=> 1
                        );

                        $my_query = new WP_Query($args);
                        if( $my_query->have_posts() ) {
                            while ($my_query->have_posts()) : $my_query->the_post(); ?>

                                <tr>
                                    <td><input type="checkbox" name="delete[]" value="<?php echo the_ID(); ?>"></td>
                                    <td><?php the_content(); ?></td>
                                </tr>

                            <?php
                            endwhile;
                        }
                        wp_reset_query();  // Restore global post data stomped by the_post().
                        ?>


                        </tbody>
                    </table>


                    <br>
                    <input class="button-primary" style="float:right;" type="submit" name="img-print-btn-postions-update" value="<?php _e('Update'); ?>"  />

                </form> <!-- end of #dxtemplate-form -->

                <br>




                <div class="clear"></div>

                <br>
                <h3>Add any custom CSS Tweaks below</h3>

              <br>

                <?php

                doData('img-print-btn-css-save', 'insert-or-update', 'img-print-btn-css', 'img-print-btn-css', $_POST['custom-button-css'], 'img-print-btn-css');

                $pages = get_page_by_path("img-print-btn-css", OBJECT, "img-print-btn-css");


                    $titles = get_post($pages->ID);


                ?>


                <form method="POST">

                    <?php echo inorup($title); ?>

                    <input type="hidden" name="ID" value="<?php echo $titles->ID; ?>">

                    <textarea name="custom-button-css" style="width:100%; height:100px;"><?php echo $titles->post_content; ?></textarea>
<br><br>
                <input class="button-primary" style="float:right;"  type="submit" name="img-print-btn-css-save" value="<?php _e('Update'); ?>"  />
                </form>

                <br>
                <h3>Change size of button</h3>
<br>

                <?php


                doData('img-print-btn-btnSize-save', 'insert-or-update', 'img-print-btn-size', 'img-print-btn-size', $_POST['btnSize'], 'img-print-btn-size');


                $sizes = get_page_by_path("img-print-btn-size", OBJECT, "img-print-btn-size");

                $size = get_post($sizes->ID);



                if($size->post_content == "sm") {
                    $selectedsm = "selected";
                } else {
                    $selectedsm = "";
                }

                if($size->post_content == "lg") {
                    $selectedlg = "selected";
                } else {
                    $selectedlg = "";
                }
                ?>



                <form method="POST">

                    <?php echo inorup($size); ?>

                    <input type="hidden" name="ID" value="<?php echo $sizes->ID; ?>">



                    <select name="btnSize"><option value="sm" <?php echo $selectedsm; ?>>Small</option><option value="lg" <?php echo $selectedlg; ?>>Large</option></select>


                   &nbsp; <input class="button-primary" type="submit" name="img-print-btn-btnSize-save" value="<?php _e('Update'); ?>" />
                </form>
				
			</div>
<br><br>

            <form  method="POST">

                <?php echo inorup(NULL); ?>


                <?php

                deleteDataMany('img-print-btn-pgs-update', $_POST['delete']);

                doData('img-print-btn-pgs-save', 'insert-or-update', 'img-print-btn-pgs', 'img-print-btn-pgs', $_POST['page_id'], 'img-print-btn-pgs');



                ?>

                <h3>Button will appear on all pages except...</h3>
<br>
               
                <?php wp_dropdown_pages(); ?>
                <input class="button-primary" type="submit" name="img-print-btn-pgs-save" value="<?php _e('Block'); ?>" id="submitbutton" />
                <br><br>
                <table class="widefat">
                    <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Page Title</th>
                    </tr>
                    </thead>

                    <?php
                    $args=array(
                        'post_type' => 'img-print-btn-pgs',
                        'post_status' => 'publish',
                        'posts_per_page' => -1,
                        'caller_get_posts'=> 1
                    );

                    $my_query = new WP_Query($args);
                    if( $my_query->have_posts() ) {
                        while ($my_query->have_posts()) : $my_query->the_post(); ?>

                            <tr>
                                <td><input type="checkbox" name="delete[]" value="<?php echo the_ID(); ?>"></td>
                                <td><?php  echo  get_the_title( get_the_content() ); ?></td>
                            </tr>

                        <?php
                        endwhile;
                    }
                    wp_reset_query();  // Restore global post data stomped by the_post().
                    ?>


                    </tbody>
                </table>


                <br>
                <input class="button-primary" style="float:right;" type="submit" name="img-print-btn-pgs-update" value="<?php _e('Update'); ?>"  />
                </form>



            <br>

            <form  method="POST">

                <?php echo inorup(NULL); ?>


                <?php

                deleteDataMany('img-print-btn-cats-update', $_POST['delete']);

                doData('img-print-btn-cats-save', 'insert-or-update', 'img-print-btn-cats', 'img-print-btn-cats', $_POST['cat'], 'img-print-btn-cats');



                ?>

                <h3>Button will appear on all categories except...</h3>
<br>
               
                <?php  wp_dropdown_categories(); ?>

                <input class="button-primary" type="submit" name="img-print-btn-cats-save" value="<?php _e('Block'); ?>" id="submitbutton" />
                <br><br>
                <table class="widefat">
                    <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Category</th>
                    </tr>
                    </thead>

                    <?php
                    $args=array(
                        'post_type' => 'img-print-btn-cats',
                        'post_status' => 'publish',
                        'posts_per_page' => -1,
                        'caller_get_posts'=> 1
                    );

                    $my_query = new WP_Query($args);
                    if( $my_query->have_posts() ) {
                        while ($my_query->have_posts()) : $my_query->the_post(); ?>

                            <tr>
                                <td><input type="checkbox" name="delete[]" value="<?php echo the_ID(); ?>"></td>
                                <td><?php  echo get_cat_name(get_the_content()) ?></td>
                            </tr>

                        <?php
                        endwhile;
                    }
                    wp_reset_query();  // Restore global post data stomped by the_post().
                    ?>


                    </tbody>
                </table>


                <br>
                <input class="button-primary" style="float:right;" type="submit" name="img-print-btn-cats-update" value="<?php _e('Update'); ?>"  />
            </form>




<br>
			<footer class='dx-footer  clear'>
			</footer>

		</div>
		<div class="sidebar alignright">
            <h2>PrintMoney Stats</h2>

            <p>Track how many times a button has been clicked for an image. This doesn't mean sales but shows how well your buttons are performing click wise. Larger Images size are more acceptable prints. <br />
              <br />
              
 <?php             
              
  $affiliateID = "$_SERVER[HTTP_HOST]";
  
   echo  "<div><h3>View/Withdraw Your <a href='http://www.dotphoto.com/WPLand.asp?affiliateID=$affiliateID&action=claim'>Earnings</a></h3></div>";

?>
            <table class="widefat">
                <thead>
                <tr>
                    <th>Image URL</th>
                    <th>Affiliate ID</th>
                    <th>Clicked Count</th>
                </tr>
                </thead>

                <tbody>


                <?php
                $args=array(
                    'post_type' => 'img-print-clicks',
                    'post_status' => 'publish',
                    'posts_per_page' => -1,
                    'caller_get_posts'=> 1
                );

                $my_query = new WP_Query($args);
                if( $my_query->have_posts() ) {
                    while ($my_query->have_posts()) : $my_query->the_post(); ?>



                        <tr>
                            <td><a href="<?php echo get_the_content(); ?>" title="<?php echo get_the_content(); ?>" target="_blank"><?php echo  substr(get_the_content(), 0, 40);  ?></a></td>
                            <td><?php echo get_the_excerpt(); ?></td>
                            <td><?php echo get_post_field('post_parent', get_the_ID()); ?></td>
                        </tr>


                    <?php
                    endwhile;
                }
                wp_reset_query();  // Restore global post data stomped by the_post().
                ?>


                </tbody>
            </table>
		</div>
	</div>
	
</div>