import React from "react";
import './footer.css';

const Footer = () => {
    return (
        <footer class="page-footer font-small pt-4">

            <div class="container">

                <ul class="list-unstyled list-inline text-center">
                    <li class="list-inline-item">
                        <a class="btn-floating btn-li mx-1" target="_blank" href="https://www.linkedin.com/in/justin-johnson-413a93169/">
                            <i class="fab fa-linkedin"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-envelope mx-1" href="mailto:jjustin634@gmail.com">
                            <i class="far fa-envelope"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating mx-1" target="_blank" href="https://github.com/justinjohnson-dev">
                            <i class="fab fa-github"> </i>
                        </a>
                    </li>
                </ul>

            </div>

            <div class="footer-copyright text-center py-3">© 2021 Copyright - Stay Connected!
            {/* <a href="https://mdbootstrap.com/bootstrap-tutorial/"> thebirthdayreminder.com</a>
             */}
            </div>

        </footer>
    );
}

export default Footer;