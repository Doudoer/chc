// Script para agregar clientes masivamente a Firestore
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const uid = 'GCzGtPWctQhkxMW5aOswznnyQay2'; // Cambia por tu UID real si es diferente
const clientes = [
  { nombreEmpresa: 'LUIS BRACHO', rif: 'N/A', telefono: 'N/A', direccion: '' },
  { nombreEmpresa: 'NORTH AMERICAN BLUE ENERGY PARTNERS, SUCURSAL VENEZUELA', rif: 'J-50534226-6', telefono: '', direccion: 'ALMACEN N1 CARRETERA N GALPON FRENTE A SIZUCA, CIUDAD OJEDA ESTADO ZULIA' },
  { nombreEmpresa: 'SERVICIOS PETROLEROS BAGLIER & VILCHEZ, C.A', rif: 'J-40630830-7', telefono: 'N/A', direccion: 'AV 79 ENTRE CALLES 149A Y 149B, LOCAL NRO 149A-183, BARRIO PARCELAMIENTO SAN BENITO' },
  { nombreEmpresa: 'JUAN GONZALEZ', rif: 'V-12.128.899', telefono: '0414-8669904', direccion: 'MATURIN ESTADO MONAGAS' },
  { nombreEmpresa: 'MARIA  NOGUERA', rif: 'V-16.559.863', telefono: '0414-6114610', direccion: 'PRIMERO DE MAYO' },
  { nombreEmpresa: 'DISUSERCA', rif: 'J506367351', telefono: '4126888801', direccion: 'EL MANZANILLO, SAN FRANCISCO - ZULIA' },
  { nombreEmpresa: 'ESPINA ENTERPRISES, C.A', rif: 'J-506367351', telefono: 'N/A', direccion: 'EL MANZANILLO, SAN FRANCISCO - ZULIA' },
  { nombreEmpresa: 'DESARROLLO DE ACTIVIDADES PETROLERAS, C.A', rif: 'J-41164939-2', telefono: '', direccion: '' },
  { nombreEmpresa: 'PETROVENCA', rif: 'J-31695869-8', telefono: '', direccion: '' },
  { nombreEmpresa: 'MAXULY MALDONADO', rif: '', telefono: '0424-6375001', direccion: 'SAN FRANCISCO - ZULIA' },
  { nombreEmpresa: 'UNITED CALIBRATION SERVICES, C.A', rif: 'J-41079988-9', telefono: '0264-2516143', direccion: 'CALLE 2, CASA N°34-A, URB LAS 50, CABIMAS ZULIA.' },
  { nombreEmpresa: 'OILWELL INSTRUMENTACION SERVICES, C.A', rif: 'J-41200631-2', telefono: '0412-1057239', direccion: 'LAGUNILLAS, CAMPO GRANDE' },
  { nombreEmpresa: 'PABLO SANABRIA', rif: 'V-13.168.481', telefono: '0424-8492372', direccion: 'BARCELONA' },
  { nombreEmpresa: 'EL MUNDO DEL GUANTE 2014, C.A', rif: 'J-40513382-1', telefono: 'N/A', direccion: 'CALLE LOS SANCHEZ, LOCAL COMERCIAL NRO 3-A, SECTOR LAS MINAS, SAN ANTONIO DE LOS ALTOS, MIRANDA' },
  { nombreEmpresa: 'FERREINDUSTRIAL L&V 2024, C.A', rif: 'J-5055716-8', telefono: '0412-8367936', direccion: 'AV PRINCIPAL, CONJUNTO RESIDENCIAL VALLE ARRIBA, PARCELA B-9, URB LA PALMA REAL, SECTOR1, NAGUANAGUA, CARABOBO' },
  { nombreEmpresa: 'INVERSIONES EMI 1212, C.A.', rif: 'J-312417749', telefono: '0424-1617750', direccion: 'CTRA CARRETERA NACIONAL GUATIRE - ARAICA CC CENTRO COMERCIAL DAYMAR, ETAPA II NIVEL 2, LOCAL P2-10, GUATIRE MIRANDA' },
  { nombreEmpresa: 'JESUS MATA', rif: 'V-13.093.231', telefono: '0412-1112505', direccion: 'BARCELONA' },
  { nombreEmpresa: 'RICHARD ZALAZAR', rif: 'V18274102', telefono: '4128795739', direccion: 'MATURIN ESTADO MONAGAS' },
  { nombreEmpresa: 'CUMBRES CONSTRUCCIONES C.A.', rif: 'J-505833316', telefono: '', direccion: 'AV 300 CASA NRO 160-527 SECTOR LOS DULCES SUR AMERICA ZULIA ZONA POSTAL 4004' },
  { nombreEmpresa: 'ESPINA ENTERPRISE C.A', rif: 'J-506367351', telefono: '', direccion: 'MANZANILLO' },
  { nombreEmpresa: 'Sispeca Extin', rif: 'J306235086', telefono: '0424-6265344', direccion: 'C. 78B, Maracaibo 4005, Zulia' },
  { nombreEmpresa: 'T&M OIL COMPANY, C.A', rif: 'J-404981284', telefono: '', direccion: 'AV 3C CON CALLE 77, SECOR CERROS DE MARIN, MARACAIBO ZULIA' },
  { nombreEmpresa: 'TERAN SERVICIOS VENEZOLANOS C.A', rif: 'J312182164', telefono: '', direccion: 'CALLE COTO PAUL ENTRE N Y O, EDIF TESERVENCA PISO PB LOCAL SN, SECTOR BARRIO UNION, CIUDAD OJEDA, ZULIA' },
  { nombreEmpresa: 'CONSTRUCTORES VENEZOLANOS C.A', rif: 'J-07006927-9', telefono: 'N/A', direccion: 'CALLE 114 62-225, PARCELA N#8 EDIF CONVECA, ZONA INDUSTRIAL ETAPA 1 MARACAIBO ESTADO ZULIA' },
  { nombreEmpresa: 'TRANSPORTADORA DINACA C.A.', rif: 'J299473944', telefono: 'N/A', direccion: 'AV 17 PROLONGACION C-1 EDIF TUFERCA ANTES SANTA ROSALIA PISO PB LOCAL 89D-35 TUFERCA SECTOR LA CIRCUNVALACION 1 MARACAIBO ZULIA ZONA POSTAL 4001' },
  { nombreEmpresa: 'GLOBAL PROTECCION INTEGRAL C.A.', rif: 'J506277190', telefono: 'N/A', direccion: 'AV LOS PROCERES COMPLEJO PALMA REAL CASA, URBANIZACION LOS JARDINES 1-A NRO 26 SECTOR TIPURO MATURIN MONAGAS ZONA POSTAL 6201' },
  { nombreEmpresa: 'CORPORACIONES CELIMENES CA', rif: 'J502125418', telefono: 'N/A', direccion: 'AV 17 ENTRE CALLES 79 Y 80 CASA NRO 79-24 SECTOR PARAISO MARACAIBO ZULIA ZONA POSTAL 4001' },
  { nombreEmpresa: 'INVERSIONES EMI 1212, C.A.', rif: '31241774-9', telefono: '4248761500', direccion: 'GUATIRE EDO-MIRANDA' },
  { nombreEmpresa: 'INDUSTRIAS DE AISLANTES Y ACERO  L.A.A.C.A.', rif: 'J-310344680', telefono: 'N/A', direccion: 'CALLE CONSTANTINO MARADEL, LOCAL NRO S/N, SECTOR 1, LA PONDEROSA BARCELONA-ANZOATEGUI' },
  { nombreEmpresa: 'OTO GIMENES', rif: '', telefono: '4146130546', direccion: 'N/A' },
  { nombreEmpresa: 'MULTISERVICIOS JEROMA', rif: 'J-403673411', telefono: 'N/A', direccion: '' },
  { nombreEmpresa: 'EMIGLEIDYS BETANCOURT', rif: 'V12438554', telefono: '4148456902', direccion: '' },
  { nombreEmpresa: 'Gustavo Borja', rif: 'v17360581', telefono: '41411909414', direccion: '' },
  { nombreEmpresa: 'JOSE DE JESUS MARTINEZ', rif: '9812169', telefono: '4148482054', direccion: 'MRW OFICINA FUERZAS ARMADAS' },
];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const basePath = `artifacts/default/users/${uid}/clientes`;

async function agregarClientes() {
  for (const cliente of clientes) {
    await db.collection(basePath).add({
      ...cliente,
      fechaCreacion: new Date().toISOString(),
    });
    console.log('Cliente agregado:', cliente.nombreEmpresa);
  }
  console.log('Todos los clientes han sido agregados.');
}

agregarClientes().catch(console.error);
