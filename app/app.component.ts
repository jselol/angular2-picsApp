import { Component, trigger,state, style, transition, animate, keyframes} from '@angular/core';


@Component({
    selector: 'my-app',
    template: `
    <div class="row" [@movePanel]='state'>
        <div class="columns" id="picContainer">
            <div id="content" [@focusPanel]='state' ><img id="imgContainer" [src]="source"></div>
        </div>
        <div class="columns">
            <button (click)="nextImage()">Next</button>
        </div>

        <div>
            <input type="file" (change)="change($event)" />
            <img id="image" />
        </div>

    </div>
    `,
    styles: [`
        button{font-size: 1.8em;}
        #content {background:#eeeeee;}
        .row{display: inline-block;min height: 40em;}
        #picContainer{height: 50em; box-shadow: 2px 3px 15px -8px;
        width: 35em;}
        img{width: 100%;height: 100%;}
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
    filesToUpload: Array<File>;
    sourceArr=[
      './app/me1.jpg',
      './app/me2.jpg'
    ];
    i = 0;
    source: string = '';
    state: string = 'inactive';

    ngOnInit(){
      this.source = this.sourceArr[this.i];
      this.filesToUpload = [];
    }

    change(event){
        var reader = new FileReader();
        // read the image file as a data URL.
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: Event) => {
          this.onLoadCallback(e);
        }
    }

    onLoadCallback(e){
        var src: string;
        var imgElement = document.getElementById("imgContainer");
        src = e.target.result;
        imgElement.src = src;
        this.sourceArr.push(imgElement.src);
    }

    addFileToSrcArr(fileSrc){
        this.srcArr.push('./app/' + fileSrc);
    }

    //Check this:
    //https://embed.plnkr.co/VKLszgqJtobyVruBj3Op/

    nextImage(){
        if((this.i + 1) != this.sourceArr.length){
          this.i++;
        } else {
          this.i = 0;
        }
        this.source = this.sourceArr[this.i];
    }
 }
