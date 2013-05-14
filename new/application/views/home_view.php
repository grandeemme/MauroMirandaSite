<main>
	
	<?php 
	foreach ($articles as $article):
		?>
		<article class="<?=$article['class']?>">
			<header ><div><?=$article['title']?></div></header>
			
			<div><?=$article['value']?></div>
		</article>
		
	<?php 	

	endforeach;
	?>
	

</main>