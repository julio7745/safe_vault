
// Outputs
bool i_controleDosLeds_ledStatus_var[4] = { LOW, LOW, LOW, LOW };

void e_controleDosLeds_setAll_fnct () {
  for (int led = 0; led < 4; led ++){
     i_controleDosLeds_ledStatus_var[led] = HIGH;
  }
}

void e_controleDosLeds_resetAll_fnct () {
  for (int led = 0; led < 4; led ++){
      i_controleDosLeds_ledStatus_var[led] = LOW;
  }
}

void e_controleDosLeds_setOne_fnct (int led) {
  i_controleDosLeds_ledStatus_var[led] = HIGH;
}

void e_controleDosLeds_resetOne_fnct (int led) {
  i_controleDosLeds_ledStatus_var[led] = LOW;
}

void e_controleDosLeds_tooggleAll_fnct () {
  for (int led = 0; led < 4; led ++){
      i_controleDosLeds_ledStatus_var[led] = !i_controleDosLeds_ledStatus_var[led];
  }
}
