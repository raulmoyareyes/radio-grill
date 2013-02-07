<?php
					date_default_timezone_set('Europe/Madrid');
					$fecha_dia = date('D');
					$fecha_H = date('Hi');
					
					$a=0; $b=0; $c=0; $d=0; $e=0;
					$showname="";
					$commingUp="";
					$commingUpTime;
					$xml = simplexml_load_file("programacion/horas.xml");
					
					foreach($xml->children() as $child[$a]){
					echo $child[$a];
					$a ++;
					}
					
					
					foreach($child[0]->children() as $day[$b]){
						
						$curday = $day[$b]->getName();
						if ($fecha_dia == "$curday"){
							$fixDay = $curday;
							foreach($day[$b]->children() as $times[$c]){
								$tx = explode("-",$times[$c]->attributes());
								if($tx[0] <= $fecha_H and $tx[1] > $fecha_H){
									$showTime = $tx;
									$showname = $times[$c];
									$e=$c;
									$e++;
								}
							$commingUp = $times[$e];
							if($times[$c] == $commingUp){
								$commingUpTime = $times[$c]->attributes();	
							}	
							$c++;
						}
					}
					$b++;
					}
					
					if($commingUp == ""){
						$c ="0";
						if($fixDay == "Mon"){$fixDay1 = "Tue";}
						if($fixDay == "Tue"){$fixDay1 = "Wed";}
						if($fixDay == "Wed"){$fixDay1 = "Thu";}
						if($fixDay == "Thu"){$fixDay1 = "Fri";}
						if($fixDay == "Fri"){$fixDay1 = "Sat";}
						if($fixDay == "Sat"){$fixDay1 = "Sun";}
						if($fixDay == "Sun"){$fixDay1 = "Mon";}
						
					foreach($child[0]->children() as $day[$b]){
						$curday = $day[$b]->getName();
						if ($fixDay1 == "$curday"){
							foreach($day[$b]->children() as $times[$c]){
							$tx = explode("-",$times[0]->attributes());
							$c++;
						}
						$commingUp = $times[0];
						$commingUpTime = $times[0]->attributes();
						}
						$b++;
						}
					}
					
					foreach($child[1]->children() as $showname2[$d]){
						$curshow = $showname2[$d]->attributes();
						if("$curshow"==$commingUp){
							$commingUp = $showname2[$d]->Name[0];
							}
					// Getting Show info
					if("$curshow"==$showname){			
						$name1 = $showname2[$d]->Name[0];
						$st1 = $showTime[0];
						$st2 = $showTime[1];
						$showtime1 = str_split($st1, 2);
						$showtime2 = str_split($st2, 2);
						$dj1 = $showname2[$d]->DJ[0];
						$social = $socia2[$d]->Social[0];
						$desc1 = $showname2[$d]->Description[0];
						$imgPaht1 = $showname2[$d]->Image[0];
						$showtype = $showname2[$d]->Status[0];
						}	
						$a ++;
					}
					echo "<table style='background-image: url(\"/programacion/live_1.png\");' width='607' height='227'> \n";
					print "<tr>
					<td width='290'>&nbsp;</td>
					<td>&nbsp;</td>
					<td width='10'>&nbsp;</td>
					</tr>";
					print "<tr>
					<td></td>
					
					<td class='style10'> <font size=3 color=#FFFFFF><strong>$name1</strong></font> </td>
				
					<td>&nbsp;</td>
					</tr>";
					print "<tr>
					
				<td><br> <img style='margin:3px 0px 2px 13px;; border:solid 0px #fff' width='250' height='215' src='/programacion/images/$imgPaht1'></td>
				
					<td ><br><br><font  color=#000000>Presenta:</font><font  color=#000000> $dj1 ($showtime1[0]:$showtime1[1] 		$showtime2[0]:$showtime2[1])</font><br><br>
					<font  color=#000000><strong>SÍGUELO EN / FOLLOW IN : <br><br>$showtype</strong></font> <br>
					
					<br>
					<font  color=#000000><strong>Info: $desc1</strong></font>  <br><br</td>
					<td>&nbsp;</td>
					</tr>";
					echo '</table>';
				// Comming up Next...
					$commingUpTime = explode("-",$commingUpTime);
					$st1 = $commingUpTime[0];
					$st2 = $commingUpTime[1];
					$commingUpTime1 = str_split($st1, 2);
					$commingUpTime2 = str_split($st2, 2);
					
					$Next1 = $commingUp . ' de ' . $commingUpTime1[0] . ':' . $commingUpTime1[1] . ' a ' . $commingUpTime2[0] . ':' . $commingUpTime2[1];
					echo "<table style='background-image: url(\"/programacion/live2.png\");' width='607' height='51'> \n";
					print "<tr><td height='10' width='127'></td></tr>";
					print "<tr><td>&nbsp;</td><td><font size=3 color=#FFFFFF>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$Next1</font> </td>"; 
					echo '</table>';
				?>