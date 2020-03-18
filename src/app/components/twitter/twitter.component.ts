
@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

public twitters : any [];
  constructor(public _firestoreservice: FirestoreService) {
    this._firestoreservice.getTwitter().subscribe((twitterSnapShot:any)=>{
      this.twitters=[];
      twitterSnapShot.forEach((twitter : any)=>{
        this.twitters.push({
          id: twitter.payload.doc.id,
          data: twitter.payload.doc.data()
        });
    });

  }
    );

  }

  ngOnInit() {


  }

}
