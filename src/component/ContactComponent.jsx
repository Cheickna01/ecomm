import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from "react";
export default function ContactComponent({ Datas, setDatas }) {
  const {
    prenom,
    nom,
    telephone,
    objet,
    email,
    canContact,
    typeContact,
    message,
  } = Datas;

  const [isSubmit, setIsSubmit] = useState("");
  console.log(isSubmit);
  const [isValid, setIsValid] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    objet: "",
    email: "",
    message: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);

    if (validationCheck()) {
      console.log("envoi");
      setDatas({
        prenom: "",
        nom: "",
        telephone: "",
        objet: "",
        email: "",
        canContact: false,
        typeContact: "Tel",
        message: "",
        touched: {
          prenom: false,
          nom: false,
          telephone: false,
          objet: false,
          email: false,
          message: false,
        },
      });
      setIsSubmit(false)
    }
  }
  const regNum = /^[0-9]{9,10}$/;
  const regNum2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{4,}\.[a-zA-Z]{2,}$/;

  function validationCheck() {
    const areValid = {
      prenom: false,
      nom: false,
      telephone: false,
      objet: false,
      email: false,
      message: false,
    };

    if (Datas.prenom.length < 3 || Datas.prenom.length > 20) {
      setIsValid((state) => ({ ...state, prenom: false }));
    } else {
      areValid.prenom = true;
      setIsValid((state) => ({ ...state, prenom: true }));
    }

    if (Datas.nom.length < 3 || Datas.nom.length > 20) {
      setIsValid((state) => ({ ...state, nom: false }));
    } else {
      areValid.nom = true;
      setIsValid((state) => ({ ...state, nom: true }));
    }

    if (!regNum.test(Datas.telephone)) {
      setIsValid((state) => ({ ...state, telephone: false }));
    } else {
      areValid.telephone = true;
      setIsValid((state) => ({ ...state, telephone: true }));
    }

    if (!regNum2.test(Datas.email)) {
      setIsValid((state) => ({ ...state, email: false }));
    } else {
      areValid.email = true;
      setIsValid((state) => ({ ...state, email: true }));
    }

    if (Datas.objet.length > 50 || Datas.objet.length < 20) {
      setIsValid((state) => ({ ...state, objet: false }));
    } else {
      areValid.objet = true;
      setIsValid((state) => ({ ...state, objet: true }));
    }

    if (Datas.message.length > 1000) {
      setIsValid((state) => ({ ...state, message: false }));
    } else {
      areValid.message = true;
      setIsValid((state) => ({ ...state, message: true }));
    }

    if (Object.values(areValid).every((value) => value)) {
      return true;
    } else {
      return false;
    }
  }

  function handleBlur(e) {
    const prop = e.target.name;
    setDatas({ ...Datas, touched: { [prop]: true } });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-9">
          <Form id="contact-form" onSubmit={handleSubmit}>
            <FormGroup row>
              <Label htmlFor="firstname" md={2}>
                Prenom
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="prenom"
                  value={prenom}
                  onChange={(e) =>
                    setDatas({ ...Datas, prenom: e.target.value })
                  }
                  onBlur={handleBlur}
                  valid={
                    Datas.touched.prenom &&
                    (Datas.prenom.length > 3 || Datas.prenom.length < 20)
                  }
                  invalid={
                    (Datas.touched.prenom || isSubmit) &&
                    (Datas.prenom.length < 3 || Datas.prenom.length > 20)
                  }
                />
                {(Datas.touched.prenom || isSubmit) &&
                  (Datas.prenom.length < 3 || Datas.prenom.length > 20) && (
                    <p className="text-red-600">
                      Au moins 3 caractères et 20 au plus
                    </p>
                  )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="lastname" md={2}>
                Nom
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="lastname"
                  name="nom"
                  placeholder="nom"
                  value={nom}
                  onChange={(e) => setDatas({ ...Datas, nom: e.target.value })}
                  onBlur={handleBlur}
                  valid={
                    Datas.touched.nom &&
                    (Datas.nom.length > 3 || Datas.nom.length < 20)
                  }
                  invalid={
                    (Datas.touched.nom || isSubmit) &&
                    (Datas.nom.length < 3 || Datas.nom.length > 20)
                  }
                />
                {isSubmit &&
                  (Datas.touched.nom || isSubmit) &&
                  (Datas.nom.length < 3 || Datas.nom.length > 20) && (
                    <p className="text-red-600">
                      Au moins 3 caractères et 20 au plus
                    </p>
                  )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="telnum" md={2}>
                Tel
              </Label>
              <Col md={10}>
                <Input
                  type="tel"
                  id="telnum"
                  name="telephone"
                  placeholder="Tel. number"
                  value={telephone}
                  onChange={(e) =>
                    setDatas({ ...Datas, telephone: e.target.value })
                  }
                  onBlur={handleBlur}
                  valid={
                    Datas.touched.telephone && !regNum.test(Datas.telephone)
                  }
                  invalid={
                    (Datas.touched.telephone || isSubmit) &&
                    !regNum.test(Datas.telephone)
                  }
                />
                {isSubmit &&
                  (Datas.touched.telephone || isSubmit) &&
                  !regNum.test(Datas.telephone) && (
                    <p className="text-red-600">Numero invalide!</p>
                  )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="object" md={2}>
                objet
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="object"
                  name="objet"
                  placeholder="objet"
                  value={objet}
                  onChange={(e) =>
                    setDatas({ ...Datas, objet: e.target.value })
                  }
                  onBlur={handleBlur}
                  valid={
                    Datas.touched.objet &&
                    (Datas.objet.length > 50 || Datas.objet.length < 20)
                  }
                  invalid={
                    (Datas.touched.objet || isSubmit) &&
                    (Datas.objet.length > 50 || Datas.objet.length < 20)
                  }
                />
                {isSubmit &&
                  (Datas.touched.objet || isSubmit) &&
                  (Datas.objet.length > 50 || Datas.objet.length < 20) && (
                    <p className="text-red-600">
                      Nombre de caractères: entre 20 et 50
                    </p>
                  )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setDatas({ ...Datas, email: e.target.value })
                  }
                  valid={Datas.touched.email && !regNum2.test(Datas.email)}
                  invalid={
                    (Datas.touched.email || isSubmit) &&
                    !regNum2.test(Datas.email)
                  }
                />
                {isSubmit &&
                  (Datas.touched.email || isSubmit) &&
                  !regNum2.test(Datas.email) && (
                    <p className="text-red-600">
                      Nombre de caractères: entre 20 et 50
                    </p>
                  )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="agree"
                      value={canContact}
                      onChange={(e) =>
                        setDatas({ ...Datas, canContact: e.target.checked })
                      }
                    />{" "}
                    <strong>pouvons nous vous contactez?</strong>
                  </Label>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Input
                  type="select"
                  name="contactType"
                  value={typeContact}
                  onChange={(e) =>
                    setDatas({ ...Datas, typeContact: e.target.value })
                  }
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="message" md={2}>
                Votre message
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  id="message"
                  name="message"
                  rows="12"
                  value={message}
                  onChange={(e) =>
                    setDatas({ ...Datas, message: e.target.value })
                  }
                  onBlur={handleBlur}
                  valid={Datas.touched.message && Datas.message.length > 1000}
                  invalid={Datas.touched.message && Datas.message.length > 1000}
                />
                {isSubmit &&
                  Datas.touched.message &&
                  Datas.message.length > 1000 && (
                    <p className="text-red-600">Au plus 1000 caractères</p>
                  )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }} className="flex items-center">
                <Button outline className="btn-perso1" type="submit">
                  Envoyer
                </Button>
                {Object.values(isValid).every((value) => value) && (
                  <p className="text-green-600 ml-auto">Formulaire envoyé✔️</p>
                )}
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
