import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/playerModel';

@Component({
  selector: 'app-show-players',
  templateUrl: './show-players.component.html',
  // styleUrls: ['./show-players.component.css']
})
export class ShowPlayersComponent implements OnInit {
  players: any[] = [];
  @Input() ply: Player;
  constructor(private ps: PlayerService) { }

  ngOnInit() {
    this.ps.ShowAllPlayers().subscribe((data) => {
      this.players = data;
      console.log(this.players);
    });
  }

  delete(id: number) {
    const i = this.players.findIndex(e => e.id === id);
    if (i !== -1) {
    this.ps.DeletePlayer(i).subscribe(() => {
      alert(`Employee data with id ${this.ply.pid} deleted`);
    });
  }
  }
}
