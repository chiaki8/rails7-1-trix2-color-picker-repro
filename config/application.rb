require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rails71Trix2EsbRepro
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.active_storage.variant_processor = :mini_magick

    Rails.application.config.after_initialize do
      # ActionText::ContentHelper.allowed_attributes.add 'style'
      # ActionText::ContentHelper.allowed_attributes.add 'controls'
      # ActionText::ContentHelper.allowed_attributes.add 'poster'
      #
      # ActionText::ContentHelper.allowed_tags.add 'video'
      # ActionText::ContentHelper.allowed_tags.add 'source'
      # ActionText::ContentHelper.allowed_tags.add 'centered-div'

      ActionText::ContentHelper.allowed_attributes = Loofah::HTML5::SafeList::ACCEPTABLE_ATTRIBUTES.add('controls')
      ActionText::ContentHelper.allowed_tags = Loofah::HTML5::SafeList::ACCEPTABLE_ELEMENTS.merge(['source', 'centered-div'])
    end
  end

end
