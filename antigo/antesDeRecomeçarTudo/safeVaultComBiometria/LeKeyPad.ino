
#define l1 D0
#define l2 D2
#define l3 D3
#define l4 D4
#define c1 D1
#define c2 D5
#define c3 D6

char lekeypad(){

  pinMode(l1, OUTPUT);
  pinMode(l2, OUTPUT);
  pinMode(l3, OUTPUT);
  pinMode(l4, OUTPUT);
    digitalWrite(l1, HIGH);
    digitalWrite(l2, HIGH);
    digitalWrite(l3, HIGH);
    digitalWrite(l4, HIGH);
     
  pinMode(c1, INPUT_PULLUP);
  pinMode(c2, INPUT_PULLUP);
  pinMode(c3, INPUT_PULLUP);
  
  while(1){
    digitalWrite(l1, LOW);
    digitalWrite(l4, HIGH);
    if ( !digitalRead(l1) ) {
      if( !digitalRead(c1)){
        Serial.println("1");
        while(!digitalRead(c1)){delay(100);}
        return '1';
      }else
      if( !digitalRead(c2)){
        Serial.println("2");
        while(!digitalRead(c2)){delay(100);}
        return '2';
      }else
      if( !digitalRead(c3)){
        Serial.println("3");
        while(!digitalRead(c3)){delay(100);}
        return '3';
      }
    }
  
    digitalWrite(l1, HIGH);
    digitalWrite(l2, LOW);
    if( !digitalRead(l2) ){
      if( !digitalRead(c1)){
        Serial.println("4");
        while(!digitalRead(c1)){delay(100);}
        return '4';
      }else
      if( !digitalRead(c2)){
        Serial.println("5");
        while(!digitalRead(c2)){delay(100);}
        return '5';
      }else
      if( !digitalRead(c3)){
        Serial.println("6");
        while(!digitalRead(c3)){delay(100);}
        return '6';
      }
    }
  
    digitalWrite(l2, HIGH);
    digitalWrite(l3, LOW);
    if( !digitalRead(l3) ){
      if( !digitalRead(c1)){
        Serial.println("7");
        while(!digitalRead(c1)){delay(100);}
        return '7';
      }else
      if( !digitalRead(c2)){
        Serial.println("8");
        while(!digitalRead(c2)){delay(100);}
        return '8';
      }else
      if( !digitalRead(c3)){
        Serial.println("9");
        while(!digitalRead(c3)){delay(100);}
        return '9';
      }
    }
  
    digitalWrite(l3, HIGH);
    digitalWrite(l4, LOW);
    if( !digitalRead(l4) ){
      if( !digitalRead(c1)){
        Serial.println("*");
        while(!digitalRead(c1)){delay(100);}
      }else
      if( !digitalRead(c2)){
        Serial.println("0");
        while(!digitalRead(c2)){delay(100);}
        return '0';
      }else
      if( !digitalRead(c3)){
        Serial.println("#");
        while(!digitalRead(c3)){delay(100);}
      }
    }
    delay(50);
  }
}
