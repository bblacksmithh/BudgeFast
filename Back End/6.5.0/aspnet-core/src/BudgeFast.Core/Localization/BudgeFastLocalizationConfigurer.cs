using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace BudgeFast.Localization
{
    public static class BudgeFastLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(BudgeFastConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(BudgeFastLocalizationConfigurer).GetAssembly(),
                        "BudgeFast.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
