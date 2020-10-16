import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
})
export class ArticleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  code = `
  <template>
    <div>
      <img src="author.image" />
      <div>
        <h4>Author</h4>
        <p>{{ author.name }}</p>
        <p>{{ author.bio }}</p>
      </div>
    </div>
  </template>
  `;
}
