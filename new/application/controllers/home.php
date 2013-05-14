<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct(){
		parent::__construct();
		// Your own constructor code
	}



	public function index(){
	$classes = array('senape','celeste','mattone','latte','blu');
	
	
	$lorem = 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor, enim at egestas laoreet, nibh arcu commodo nisl, ut commodo velit mauris vel nunc. Phasellus mattis mattis libero at dictum. Pellentesque ac mauris tortor, nec pharetra elit. Nullam sit amet ornare erat. Duis id mauris erat, a dapibus sem. In ut orci eu dolor pretium mollis. Suspendisse vel ipsum odio. Proin at nisl erat. Morbi aliquet, dolor a accumsan consectetur, diam nulla condimentum nisl, eu molestie quam volutpat.';

		$data = array();
		for($i = 0 ; $i < 50 ; $i++){
			
			$data['articles'][$i]['title'] = 'Prova '.$i; 
			$data['articles'][$i]['value'] = substr($lorem, 0, rand(100, 499));
			
			$class = $classes[$i%5];
			
			if($i%5==0 || (($i+ 1 )%5)==0 ){
				$data['articles'][$i]['class'] = 'mini '.$class;
			}else{
				$data['articles'][$i]['class'] = 'maxi '.$class;
			}
		}
	
		
	
	
		$this->load->view('header_view');
		$this->load->view('home_view', $data);
		$this->load->view('footer_view');
	}
}

?>