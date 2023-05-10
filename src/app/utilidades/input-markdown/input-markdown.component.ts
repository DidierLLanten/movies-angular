import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css'],
})
export class InputMarkdownComponent implements OnInit {
  ngOnInit(): void {}

  @Output()
  textoMarkDown: EventEmitter<string> = new EventEmitter<string>();

  contenidoMarkdown = '';  

  inputTextArea(texto: string) {
    console.log('Texto: ', texto);
    this.contenidoMarkdown = texto;
    this.textoMarkDown.emit(texto);
  }
}
