import { Component, trigger,state, style, transition, animate, keyframes } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div class="row" [@movePanel]='state'>
        <div class="columns" id="picContainer">
            <div id="content" [@focusPanel]='state' ><img id="imgContainer" [src]="source"></div>
        </div>
        <div class="columns">
            <button (click)="toggleMove()"><</button>
            <button (click)="toggleMoveRight()">></button>
        </div>
    </div>
    `,
    styles: [`
        button{font-size: 1.8em;}
        #content {padding:30px; background:#eeeeee;}
        .row{display: inline-block;min height: 40em;}
        #picContainer{min-height: 25em; box-shadow: 2px 3px 15px -8px;}

    `],
    animations:[
        trigger('focusPanel', [
            state('inactive', style({
              transform: 'scale(1)'
            })),
            state('active', style({
              transform: 'scale(1.6)',
              backgroundColor: '#cfd8dc'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out')),
        ]),

        trigger('movePanel', [
            transition('void => *',[

                animate(800, keyframes([
                    style({opacity: 0, transform: 'translateY(-200px)', offset:0}),
                    style({opacity: 1, transform: 'translateY(25px)', offset:.75}),
                    style({opacity: 1, transform: 'translateY(0)', offset:1}),
                ]))
            ])
        ])
    ]
})
export class AppComponent {
    source='./app/me1.jpg';
    state: string = 'inactive';

    //Check this:
    //https://embed.plnkr.co/VKLszgqJtobyVruBj3Op/

    toggleMove(){
      this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

    toggleMoveRight(){
      this.source = './app/me2.jpg';

    }
 }
