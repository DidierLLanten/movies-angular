import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css'],
})
export class InputMarkdownComponent implements OnInit {
  ngOnInit(): void {}

  @Input()
  placeHolderTextArea: string = 'Texto'

  @Input()
  contenidoMarkdown = '';  

  @Output()
  textoMarkDown: EventEmitter<string> = new EventEmitter<string>();


  inputTextArea(texto: string) {
    console.log('Texto: ', texto);    
    this.textoMarkDown.emit(texto);
  }
}
