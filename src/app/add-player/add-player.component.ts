import { Component, OnInit } from "@angular/core";
import { Player } from "../models/playerModel";
import { PlayerService } from "../services/player.service";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  ply: Player;
  
  constructor(private ps: PlayerService) {
    this.ply = new Player();
  }
  btnSave_click() {
    //alert(JSON.stringify(this.ply));
    this.ps.AddPlayer(this.ply).subscribe(data => {
      alert(JSON.stringify(data));
    });
  }
  ngOnInit() {}
}
