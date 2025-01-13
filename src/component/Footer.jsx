export default function Footer() {
  return (
    <div>

      <footer class="mt-5 pt-4 sticky-bottom flex">
        <div class="container">
          <ul class="list-unstyled list-inline text-center list-link">
            <li class="list-inline-item">
              <a
                class="mx-auto my-auto"
                href="https://www.facebook.com/?locale=fr_FR"
              >
                <i id="social-fb" class="fa fa-facebook fa-2x social"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a class="mx-auto my-10" href="https://x.com/">
                <i id="social-tw" class="fa fa-twitter fa-2x social"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a class="mx-auto my-auto" href="https://www.instagram.com/">
                <i id="social-gp" className="fa fa-instagram fa-2x social"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a class="mx-auto my-auto" href="https://mail.google.com/">
                <i id="social-em" class="fa fa-envelope fa-2x social"></i>
              </a>
            </li>
          </ul>

          <div class="footer-copyright text-center py-3">
            © 2024 Copyright : <a href="http://localhost:3000/">tyshop</a>
          </div>
        </div>
        <div>
          <button className="toUp">
            <a href="#header">
              <i class="fas fa-2x fa-arrow-up"></i>{" "}
            </a>
          </button>
        </div>
      </footer>
      </div>

  );
}
