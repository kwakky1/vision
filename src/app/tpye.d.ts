interface FullOptometry {
  sph: string;
  cyl: string;
  axi: string;
  cv: string;
  add: string;
}

interface FullOptometryData {
  right: FullOptometry;
  left: FullOptometry;
}

interface InputData {
  name: string;
  birthday: Date;
  full: FullOptometryData;
  staff: string;
  store: string;
}
