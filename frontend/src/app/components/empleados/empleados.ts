import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
  providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (res) => {
        this.empleadoService.empleados = res;
      },
      error: (err) => console.error(err)
    });
  }

  addEmpleado(form?: NgForm) {
    if (form) {
      if (form.value._id) {
        this.empleadoService.putEmpleado(form.value).subscribe({
          next: () => {
            this.resetForm(form);
            this.getEmpleados();
          },
          error: (err) => console.error(err)
        });
      } else {
        this.empleadoService.postEmpleado(form.value).subscribe({
          next: () => {
            this.resetForm(form);
            this.getEmpleados();
          },
          error: (err) => console.error(err)
        });
      }
    }
  }

  editEmpleado(empleado: Empleado) {
    this.empleadoService.selectedEmpleado = { ...empleado };
  }

  deleteEmpleado(_id: string) {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(_id).subscribe({
        next: () => {
          this.getEmpleados();
        },
        error: (err) => console.error(err)
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.empleadoService.selectedEmpleado = new Empleado();
    }
  }
}