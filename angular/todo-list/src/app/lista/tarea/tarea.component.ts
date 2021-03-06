import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from 'src/app/tarea';
import { TareasService } from 'src/app/tareas.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  @Input() tarea: Tarea;

  constructor(private _tareasService: TareasService) { }

  ngOnInit() {
  }

  eliminar() {
    this._tareasService.deleteTarea(this.tarea.id).subscribe(() => {
      console.log('Eliminada');
      this._tareasService.tareasCambiadas.emit(true);
    })
  }

  completar() {
    this._tareasService.completeTarea(this.tarea).subscribe(() => {
      console.log('Actualizada')
      this._tareasService.tareasCambiadas.emit(true);
    })
  }

}
