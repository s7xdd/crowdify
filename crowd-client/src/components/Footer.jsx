import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../assets/fire-simple-bold-svgrepo-com copy.svg';

function Footer() {
  return (
    <>
      <MDBFooter bgColor='light'  className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href='' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='facebook-f' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='twitter' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='google' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='instagram' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='linkedin' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='github' />
            </a>
          </div>
        </section>

        <section>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Home</h6>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    My favorites
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Recents
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Explore</h6>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Lists
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Maps
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Campaigns</h6>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Home
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Campaigns <span className='badge rounded-pill badge-notification bg-success'>12</span>
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Donations <span className='badge rounded-pill badge-notification bg-success'>12</span>
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset text-decoration-none'>
                    Analytics
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Profile</h6>
                <p>
                  <MDBIcon color='secondary' icon='gear' className='me-2' />
                  Settings
                </p>
                <p>
                  <MDBIcon color='secondary' icon='envelope' className='me-3' />
                  Notification <span className='badge rounded-pill badge-notification bg-success'>12</span>
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Resources</h6>
                <p>How to Use Crowdify</p>
                <p>Docs</p>
                <p>Legal Terms</p>
                <p>Merch</p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='d-flex justify-content-between align-items-center text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          <div className='d-flex flex-row'>
            <img height='40rem' width='40rem' className='mb-3 mt-2' src={logo} alt='' />
            <h2 style={{ fontSize: '20px', fontWeight: '700' }} className='text-dark mt-3'>CROWDIFY</h2>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '400' }} className='mt-2'>
            © 2025 Crowdify. All rights reserved.
          </div>
        </div>
      </MDBFooter>
    </>
  );
}

export default Footer;
