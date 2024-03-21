Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: :all, same_site: :none, secure: false, httponly: :true
