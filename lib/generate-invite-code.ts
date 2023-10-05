export const generateInviteCode = () => {
  var code: string = "";
  for (let i = 0; i < 6; i++) {
    if (Math.random() > 0.4) {
      code += String.fromCharCode(Math.floor(Math.random() * 26) + 0x41);
    } else {
      code += Math.floor(Math.random() * 10);
    }
  }

  return code;
};
