from django.utils.translation import gettext_lazy as _

from weblate.addons.events import EVENT_PRE_COMMIT
from weblate.addons.scripts import BaseScriptAddon


class GenerateMDAddon(BaseScriptAddon):
    # Event used to trigger the script
    events = (EVENT_PRE_COMMIT,)

    # This makes the addon run for every component in the Project
    project_scope = True

    # Name of the addon, has to be unique
    name = "generatemd"
    # Verbose name and long descrption
    verbose = _("Generate MD files from PO translations")
    description = _("This addon uses po4a-translate to generate the output MD files after translations.")

    # Script to execute
    script = "_scripts/translateSite.sh"
    # File to add in commit (for pre commit event)
    # does not have to be set
    add_file = "*.md"