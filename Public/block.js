class Block {

  constructor(time, lineIndex, lineLayer, type, cutDirection) {
    this.type = type;

    this.size = 35;

    this.time = time;

    this.lineIndex = lineIndex;
    this.lineLayer = lineLayer;
    this.cutDirection = cutDirection;

    if (this.type == 1) {
      this.color = color(0, 0, 255);
    } else if (this.type == 0) {
      this.color = color(255, 0, 0);
    } else if (this.type == 3) {
      this.color = color(20, 20, 20);
      this.cutDirection = 8;
    }


    this.pos = createVector(indexs[this.lineIndex], layers[this.lineLayer], -(this.time / beatLength) * 100 * this.size * 100);

    this.hit = false;
    this.missed = false;
    this.score = 0;

  }
  display() { //Display block
    if (this.hit) { return; }

    normalMaterial();
    smooth();
    lights();

    stroke(60);
    emissiveMaterial(this.color);
    // specularMaterial(this.color); 
    shininess(1);

    if (this.type == 3) {
      specularMaterial(this.color);
      shininess(10);
      stroke(180);
    }

    push();

    translate(this.pos.x, this.pos.y, this.pos.z);
    // console.log(this.pos);

    let rotation = 0;
    switch (this.cutDirection) {
      case 0:
        rotation = 0;
        break;
      case 1:
        rotation = PI;
        break;
      case 2:
        rotation = PI + PI / 2;
        break;
      case 3:
        rotation = PI / 2;
        break;
      case 4:
        rotation = 2 * PI - PI / 4
        break;
      case 5:
        rotation = PI / 4;
        break;
      case 6:
        rotation = PI + PI / 4;
        break;
      case 7:
        rotation = PI - PI / 4;
        break;
      default:
        rotation = 0;
        break;
    }
    if (this.type == 1 || this.type == 2) {
      rotate(rotation)
      box(this.size);
      translate(0, 0, (this.size / 2) + 1);
      fill(255);
      stroke(51);
      if (this.cutDirection != 8) {
        triangle(-15, 15, 15, 15, 0, 0);
      } else {
        ellipse(0, 0, 15, 15);
      }
    } else if (this.type == 3) {
      sphere(this.size / 2);
    }

    pop();

  }

  collision() {
    if (!this.hit) {
      // let v = projectWorldToCanvas(canvas, this.pos);
      // v.y = height - v.y;
      // let edge = projectWorldToCanvas(canvas, createVector(370 / 4, 150 / 2, this.pos.z));

      // sliceFile.setVolume(volume/100 - 0.4);

      // if(volume/100 - 0.4 <= 0 ){
      //   sliceFile.setVolume(0);
      // }else{
      //   sliceFile.setVolume(volume/100 - 0.4);
      // }

      // let scale = edge.x / width;

      // let h = createVector(100 * (mouseX - pmouseX), 100 * (mouseY - pmouseY));

      // let hitboxOffsetB;
      // if (this.type == 3){
      //   hitboxOffsetB = 0;
      // }else{
      //   hitboxOffsetB = hitboxOffset;
      // }

      if (cam.centerZ - this.pos.z + songOffset * 2 < 300 && cam.centerZ - this.pos.z + songOffset * 2 > -1000) {

        let v = projectWorldToCanvas(canvas, this.pos);
        v.y = height - v.y;
        let edge = projectWorldToCanvas(canvas, createVector(370 / 4, 150 / 2, this.pos.z));

        sliceFile.setVolume((volume / 100) - (1-(hitvolume/100)));

        if ((volume / 100) - (1-(hitvolume/100)) <= 0) {
          sliceFile.setVolume(0);
        } else {
          sliceFile.setVolume((volume / 100) - (1-(hitvolume/100)));
        }

        let scale = edge.x / width;

        let h = createVector(100 * (mouseX - pmouseX), 100 * (mouseY - pmouseY));

        // console.log(h.heading());


        let hitboxOffsetB;
        if (this.type == 3) {
          hitboxOffsetB = 0;
        } else {
          hitboxOffsetB = hitboxOffset;
        }


        if (this.cutDirection == 0) {
          if (h.heading() > -PI / 2 - PI / 4 && h.heading() < -PI / 4) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 1) {
          if (h.heading() > PI / 4 && h.heading() < PI / 2 + PI / 4) {

            console.log("Mouse: "+ mouseX,mouseY);
            console.log("Left: " + (v.x - this.size * scale - hitboxOffsetB));
            console.log("Right: " + (v.x + this.size * scale + hitboxOffsetB));

            console.log(v.x, v.y);


            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              console.log('Inside X');
              
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                console.log('Inside Y');
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 2) {
          if (h.heading() > PI / 2 + PI / 4 && h.heading() < PI || h.heading() > -PI && h.heading() < -PI - PI / 4) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 3) {
          if (h.heading() > -PI / 4 && h.heading() < PI / 4) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 4) {
          if (h.heading() > -PI && h.heading() < -PI / 2) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 5) {
          if (h.heading() > -PI / 2 && h.heading() < 0) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 6) {
          if (h.heading() > PI / 2 && h.heading() < PI) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 7) {
          if (h.heading() > 0 && h.heading() < PI / 2) {
            if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
              if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
                this.hit = true;
                sliceFile.play();
              }
            }
          }
        }
        else if (this.cutDirection == 8) {
          if (mouseX > v.x - this.size * scale - hitboxOffsetB && mouseX < v.x + this.size * scale + hitboxOffsetB) {
            if (mouseY > v.y - this.size * scale - hitboxOffsetB && mouseY < v.y + this.size * scale + hitboxOffsetB) {
              this.hit = true;
              sliceFile.play();
            }
          }
        }

      }
      if (this.type != 3 && cam.centerZ - this.pos.z + songOffset * 2 < -1000) {
        this.missed = true;
      }
    }

  }


}