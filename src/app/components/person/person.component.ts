import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaritalData, Person, PersonData } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { MaritalStatusService } from 'src/app/services/maritalStarus.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageComponent } from '../message/message/message.component';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personaForm!: FormGroup;
  currentPersona!: PersonData;
  isEdit: boolean = false;
  selectedFile: any;
  opciones: MaritalData[] = [];;

  listPersonas: PersonData[] = [];
  EmployeeList: Person[] = [];
  title = 'Evertecprueba';
  textButton:string = "Guardar";
  optionActual:string ="Registrando";
  numberRecords:number=0;
  currentPage: number = 1;
  pageSize:number=10;
  itemPerPage: number[] = [ 2,5,10,15,20];


  constructor(private formBuilder: FormBuilder,
    private personService: PersonService,
    private maritalservice:MaritalStatusService,
    private datePipe: DatePipe,
    private message:MessageComponent,
    ) { }

     formattedBirthDate( fecha: Date) {
      return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

  ngOnInit() {
    this.personaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      foto_usuario: [''],
      estado_civil: ['', Validators.required],
      tiene_hermanos: ['', Validators.required],
      file: ['', Validators.required]
    });
    this.getMaritasStatus();
    this.getinitialData();
  }


  onSubmit() {
    const formData = this.personaForm.value;
    const newPersona: Person = {
     Id: this.EmployeeList.length + 1,
      name: formData.nombre,
      LastName: formData.apellido,
      BirthDate: formData.fecha_nacimiento,
      MaritalStatus: formData.estado_civil,
      HasSiblings: formData.tiene_hermanos,
      Photo:this.selectedFile
    };
    this.personService.create(newPersona).subscribe({
      complete:() => {
        this.message.showToastSuccesfull("Empleado ingresado satisfactoriamnete");
        this.getinitialData();
        this.personaForm.reset();
      },
      error: (error) =>{
        this.message.showToastFailed(error);
      }

  });
}

  handleFileInput(files: any) {
    let fileList: FileList = files.target.files;
    const file: File = fileList[0];
    var pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.message.showToastFailed('invalid format');
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }

  _handleReaderLoaded(e:any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.selectedFile = base64result;
    }


  onEdit(persona: PersonData) {
    this.isEdit = true;
    this.textButton ="Actualizar"
    this.optionActual="Actualizando"
    this.currentPersona = persona;
    this.personaForm.setValue({
      nombre : persona.name,
      apellido: persona.lastName,
      fecha_nacimiento:this.formattedBirthDate(persona.birthDate),
      foto_usuario: persona.photo,
      estado_civil: persona.id_marital,
      tiene_hermanos: persona.hasSiblings,
      file:persona.photo
    });
  }

  onUpdate() {
    const formData = this.personaForm.value;
    this.currentPersona.name   =formData.nombre;
    this.currentPersona.lastName = formData.apellido;
    this.currentPersona.birthDate = formData.fecha_nacimiento;
    this.currentPersona.photo = this.selectedFile;
    this.currentPersona.maritalStatus = formData.estado_civil;
    this.currentPersona.hasSiblings = formData.tiene_hermanos;
    this.personService.update(this.currentPersona)
    .pipe(
      map((response: any) => {
        this.message.showToastSuccesfull(response.message);
      }),

      catchError(error => {
        console.error(error);
        this.message.showToastFailed(error);
        return throwError(() => error);
      })
    )
    .subscribe(response => {
      console.log(response);
    });
    ///.subscribe({

    //   // complete:() => {
    //   //   this.message.showToastSuccesfull("Empleado Actualizado con Exito!!")
    //   //   this.getinitialData();

    //   // },
    //   // error: (error) =>{
    //   //   this.message.showToastFailed(error);
    //   // }

    // })
    this.isEdit = false;
    this.textButton ="Guardar";
    this.optionActual="Registrando";
    this.personaForm.reset();
  }

  onDelete(persona: PersonData) {
    this.optionActual="Eliminando";
    let data = JSON.stringify(persona);

    console.log(data);
    this.personService.delete(data).subscribe ({

      complete:() => {
        this,this.message.showToastSuccesfull("Empleado Eliminado con !!Exito")
        this.getinitialData();
        this.optionActual="Registrando";

      },
      error: (error:HttpErrorResponse) =>{
        this,this.message.showToastFailed(error.message);
        alert(error.message)
      }

  });

  }

   getinitialData():void{
    this.personService.getAll(this.currentPage, this.pageSize).subscribe(datos => {
      this.listPersonas = datos;
      this.numberRecords=datos[0].totalRecords;
    });
  }

  onPageChanged(event: any) {
    this.currentPage = event;
    this.getinitialData();
  }

  onPageSizeChange(event:any):void{
    this.pageSize = event.target.value;
    this.currentPage =1;
    this.getinitialData();
  }

  getMaritasStatus(){
    this.maritalservice.getAll().subscribe(opciones => {
      this.opciones = opciones;
    });
  }
  onReset(){
    this.personaForm.reset();

  }

}
