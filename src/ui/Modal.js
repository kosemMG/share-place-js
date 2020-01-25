export class Modal {
  constructor(contentId, modalTemplateId = 'modal-template') {
    this.contentTemplateElement = document.getElementById(contentId);
    this.modalTemplateElement = document.getElementById(modalTemplateId);
    this.fallbackText = 'Get rid of IE, use Chrome instead!';
  }

  show() {
    if ('content' in document.createElement('template')) {
      const contentElement = document.importNode(this.contentTemplateElement.content, true);
      const modalContent = document.importNode(this.modalTemplateElement.content, true);
      this.backdropElement = modalContent.querySelector('.backdrop');
      this.modalElement = modalContent.querySelector('.modal');

      this.modalElement.appendChild(contentElement);
      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.modalElement = null;
    }
    if (this.backdropElement) {
      this.backdropElement.remove();
      this.backdropElement = null;
    }
  }
}
