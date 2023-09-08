import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  user = {
    name: 'Nome do Usuário',
    email: 'usuario@example.com',
    password: 'blublu',
    lastname: 'blublu',
    pronouns: 'oppenheimer',
    bio: 'i'
  };

  saveChanges() {
    // Aqui, você pode implementar a lógica para salvar as alterações do usuário no servidor
    console.log('Alterações salvas:', this.user);
  }
}
