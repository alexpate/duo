const fs = require('fs');
const Color = require('color');
const colors = require('./colors.json');

const AA_THRESHOLD = 4.5;

const VALIDATED_COLOR_SET = {colors: []};

colors.colors.forEach((set) => {
  const background = Color(set.colors[0]);
  const foreground = Color(set.colors[1]);
  const contrast = background.contrast(foreground);

  if (contrast >= AA_THRESHOLD) {
    set.aa_accessible = true;
  } else {
    set.aa_accessible = false;
  }

  return VALIDATED_COLOR_SET.colors.push(set);
});

fs.writeFileSync('../src/colors.json', JSON.stringify(VALIDATED_COLOR_SET));
